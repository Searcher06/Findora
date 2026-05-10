import { useFetchRequestById } from "@/features/verification";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSendCode } from "../hooks/useSendCode";

import { VerificationHeader } from "../components/VerificationHeader";
import { QuickGuide } from "../components/QuickGuide";
import { YourCodeSection } from "../components/YourCodeSection";
import { EnterCodeSection } from "../components/EnterCodeSection";
import { SuccessScreen } from "../components/SuccessScreen";
import { VerificationFooter } from "../components/VerificationFooter";

export const CodeExchangePage = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { user } = useAuthStore();
  const { loading, request, error, setRequest } = useFetchRequestById(requestId);

  const [otp, setOtp] = useState("");

  const { sendCode, loading: sending } = useSendCode();

  const socket = useAuthStore.getState().socket;

  // Join request room and listen for real-time verification
  useEffect(() => {
    if (!requestId) return;

    socket.emit("join:request", { requestId });

    socket.on("request:verified", (updatedRequest) => {
      toast.success("Both users have verified. Item has been successfully returned");
      setRequest(updatedRequest);
    });

    return () => {
      socket.off("request:verified");
    };
  }, [requestId, setRequest, socket]);

  const handleSubmitOtp = async () => {
    if (otp.length !== 5) {
      toast.error("Please enter the complete 5-digit code.");
      return;
    }

    const data = await sendCode(requestId, { code: otp });

    if (data) {
      setRequest(data);
      setOtp("");
    }
  };

  const isFinder = request?.finderId?._id === user?._id;
  const isClaimer = request?.claimerId?._id === user?._id;

  // Verification status tracking
  const isFinderVerified = request?.finderVerified || false;
  const isClaimerVerified = request?.claimerVerified || false;

  // Determine verification states for current user
  const isUserVerified = isFinder ? isFinderVerified : isClaimerVerified;
  const isOtherUserVerified = isFinder ? isClaimerVerified : isFinderVerified;

  // Get user's code
  const userCode = isFinder ? request?.finderCode : isClaimer ? request?.claimerCode : null;

  if (loading) return <p className="font-display text-lg">Fetching...</p>;
  if (!loading && (request?.status == "pending" || null)) navigate("/");
  if (error) return <p className="font-display text-lg">{error}</p>;

  // Success UI for returned status
  if (request?.status === "returned") {
    return <SuccessScreen request={request} navigate={navigate} />;
  }

  // Original verification UI with enhanced status tracking
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/55 to-white px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col">
      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <VerificationHeader title="Verify Handover" subtitle="Confirm in-person exchange" />

        <QuickGuide />

        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-5 py-2 sm:py-4">
          <YourCodeSection userCode={userCode} isUserVerified={isUserVerified} />

          <EnterCodeSection
            otp={otp}
            setOtp={setOtp}
            isOtherUserVerified={isOtherUserVerified}
            isUserVerified={isUserVerified}
            handleSubmitOtp={handleSubmitOtp}
            sending={sending}
          />
        </div>
      </div>

      <VerificationFooter />
    </div>
  );
};
