// prettier-ignore
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useFetchRequestById } from "@/features/verification";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSendCode } from "../hooks/useSendCode";

export const CodeExchangePage = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { user } = useAuthStore();
  const { loading, request, error, setRequest } =
    useFetchRequestById(requestId);

  const [otp, setOtp] = useState("");

  const { sendCode, loading: sending } = useSendCode();

  const isFinder = request?.finderId?._id === user?._id;
  const isClaimer = request?.claimerId?._id === user?._id;

  const socket = useAuthStore.getState().socket;

  // Join request room and listen for real-time verification
  useEffect(() => {
    if (!requestId) return;

    socket.emit("join:request", { requestId });

    socket.on("request:verified", (updatedRequest) => {
      setRequest(updatedRequest);

      // HCI-friendly toast message
      if (updatedRequest.status === "returned") {
        toast.success(
          "Both users have verified. Item has been successfully returned."
        );
      } else {
        toast.info(
          "Your code has been verified. Waiting for the other user to verify."
        );
      }
    });

    return () => {
      socket.off("request:verified");
    };
  }, [requestId, setRequest, socket]);

  // Handle OTP submission
  const handleSubmitOtp = async () => {
    if (otp.length !== 5) {
      toast.error("Please enter the complete 5-digit code.");
      return;
    }

    const data = await sendCode(requestId, otp);
    if (data) {
      setRequest(data);
      setOtp(""); // clear input
    }
  };

  if (loading) return <p className="font-display text-lg">Fetching...</p>;
  if (!loading && request?.status !== "accepted") navigate("/");
  if (error) return <p className="font-display text-lg"></p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 flex flex-col mt-14">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold text-gray-900 font-display">
          Verify Handover
        </h1>
        <p className="text-gray-600 text-sm mt-1 font-sans">
          Confirm in-person exchange
        </p>
      </div>

      {/* Quick Guide First - Compact */}
      <div className="mb-4 bg-blue-50 rounded-lg p-3 max-w-xs w-full mx-auto border border-blue-100">
        <p className="text-gray-800 text-xs font-medium font-sans mb-2">
          How to verify your meeting:
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-medium shrink-0 mt-0.5">
              1
            </div>
            <p className="text-gray-700 text-xs font-sans">
              <span className="font-medium">Share</span> your code below
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-medium shrink-0 mt-0.5">
              2
            </div>
            <p className="text-gray-700 text-xs font-sans">
              <span className="font-medium">Enter</span> their code
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-medium shrink-0 mt-0.5">
              3
            </div>
            <p className="text-gray-700 text-xs font-sans">
              <span className="font-medium">Submit</span> to verify
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Now visible without scrolling */}
      <div className="flex flex-col items-center space-y-4">
        {/* Your Code Section FIRST (Users need to see their code immediately) */}
        <div className="bg-white rounded-lg p-4 max-w-xs w-full border border-gray-200 shadow-xs">
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-sm font-display text-gray-800">
              Your 5-digit code
            </h3>
            <div className="mb-2">
              <p className="text-xl font-bold text-gray-900 font-mono tracking-wider mb-1">
                {isFinder
                  ? request?.finderCode
                  : isClaimer && request?.claimerCode}
              </p>
              <div className="space-y-0.5">
                <p className="text-gray-600 text-xs font-sans">
                  Share this with the other person
                </p>
                <p className="text-gray-400 text-[11px] font-sans">
                  Show on screen or read aloud
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enter Code Section */}
        <div className="bg-white rounded-lg p-4 max-w-xs w-full border border-gray-200 shadow-xs">
          <h2 className="text-sm font-semibold mb-1.5 text-center font-display text-gray-800">
            Enter their 5-digit code
          </h2>
          <p className="text-gray-500 text-xs mb-3 text-center font-sans">
            Type the code they shared with you
          </p>

          {/* Shadcn Input OTP Component */}
          <div className="flex justify-center mb-4">
            <InputOTP maxLength={5} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="w-9 h-11 text-base border-gray-300"
                />
                <InputOTPSlot
                  index={1}
                  className="w-9 h-11 text-base border-gray-300"
                />
                <InputOTPSlot
                  index={2}
                  className="w-9 h-11 text-base border-gray-300"
                />
                <InputOTPSlot
                  index={3}
                  className="w-9 h-11 text-base border-gray-300"
                />
                <InputOTPSlot
                  index={4}
                  className="w-9 h-11 text-base border-gray-300"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleSubmitOtp}
            disabled={
              sending || otp.length < 5 || request.status === "returned"
            }
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md text-xs transition-colors duration-200 font-sans"
          >
            {sending ? "Verifying..." : "Complete Verification"}
          </button>
        </div>
      </div>

      {/* Footer - Now at bottom */}
      <div className="mt-auto pt-6 text-center">
        <p className="text-gray-400 text-[11px] font-sans">
          Findora Verification Protocol • 2026
        </p>
      </div>
    </div>
  );
};
