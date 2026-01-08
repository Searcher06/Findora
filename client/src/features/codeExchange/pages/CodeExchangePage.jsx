// prettier-ignore
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useFetchRequestById } from "@/features/verification";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSendCode } from "../hooks/useSendCode";
import { CheckCircle } from "lucide-react";

export const CodeExchangePage = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { user } = useAuthStore();
  const { loading, request, error, setRequest } =
    useFetchRequestById(requestId);

  const [otp, setOtp] = useState("");

  const { sendCode, loading: sending } = useSendCode();

  const socket = useAuthStore.getState().socket;

  // Join request room and listen for real-time verification
  useEffect(() => {
    if (!requestId) return;

    socket.emit("join:request", { requestId });

    socket.on("request:verified", (updatedRequest) => {
      toast.success(
        "Both users have verified. Item has been successfully returned"
      );
      setRequest(updatedRequest);
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

    const data = await sendCode(requestId, { code: otp });

    // Update state only on success
    if (data) {
      setRequest(data);
      setOtp(""); // clear input
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

  if (loading) return <p className="font-display text-lg">Fetching...</p>;
  if (!loading && (request?.status == "pending" || null)) navigate("/");
  if (error) return <p className="font-display text-lg">{error}</p>;

  // Success UI for returned status
  if (request?.status === "returned") {
    return (
      <div className="min-h-screen mt-14 bg-linear-to-b from-green-50 to-white text-gray-900 p-4 flex flex-col items-center justify-center">
        {/* Success Animation/Icon */}
        <div className="mb-5">
          <div className="relative">
            <div className="w-20 h-20 bg-linear-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6 max-w-xs">
          <h1 className="text-xl font-bold text-gray-900 font-display mb-2">
            Handover Complete
          </h1>
          <p className="text-gray-600 text-sm font-sans mb-3">
            The item has been successfully returned.
          </p>

          {/* User Info */}
          <div className="bg-white rounded-lg p-3 border border-green-200 shadow-xs mb-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs font-sans">Item:</span>
                <span className="text-gray-800 text-xs font-medium font-sans">
                  {request?.itemId?.name || "Item Name"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs font-sans">Finder:</span>
                <span className="text-gray-800 text-xs font-medium font-sans">
                  {request?.finderId?.firstName || "User"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs font-sans">
                  Claimer:
                </span>
                <span className="text-gray-800 text-xs font-medium font-sans">
                  {request?.claimerId?.firstName || "User"}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span className="text-green-600 text-xs font-medium font-sans">
                    Both parties verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <h3 className="text-xs font-semibold text-gray-800 font-display mb-1.5">
              What's Next?
            </h3>
            <div className="space-y-1.5">
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-600 text-[10px]">✓</span>
                </div>
                <p className="text-gray-600 text-xs font-sans">
                  Exchange recorded in secure database
                </p>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-600 text-[10px]">✓</span>
                </div>
                <p className="text-gray-600 text-xs font-sans">
                  You can close this or go to Home page
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-6 rounded-lg text-xs transition-all duration-200 font-sans shadow-sm hover:shadow"
        >
          Go to Home
        </button>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-[10px] font-sans">
            Transaction securely recorded • Findora Verification • 2026
          </p>
        </div>
      </div>
    );
  }

  // Original verification UI with enhanced status tracking
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
            <h3 className="font-semibold mb-2 text-xs font-display text-gray-800">
              Your 5-digit code
            </h3>
            <div className="mb-2">
              <p className="text-lg font-bold text-gray-900 font-mono tracking-wider mb-1">
                {isFinder
                  ? request?.finderCode
                  : isClaimer
                  ? request?.claimerCode
                  : null}
              </p>
              <div className="space-y-0.5">
                <p className="text-gray-600 text-xs font-sans">
                  Share this with the other person
                </p>
                <p className="text-gray-400 text-[10px] font-sans">
                  Show on screen or read aloud
                </p>
              </div>
            </div>

            {/* Status indicator for your verification */}
            {isUserVerified && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-green-600 text-xs font-medium font-sans">
                    ✓ The other user has verified you
                  </span>
                </div>
              </div>
            )}
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
            <InputOTP
              maxLength={5}
              value={otp}
              onChange={setOtp}
              disabled={isOtherUserVerified}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className={`w-9 h-11 text-base ${
                    isOtherUserVerified
                      ? "bg-gray-50 border-gray-200"
                      : "border-gray-300"
                  }`}
                />
                <InputOTPSlot
                  index={1}
                  className={`w-9 h-11 text-base ${
                    isOtherUserVerified
                      ? "bg-gray-50 border-gray-200"
                      : "border-gray-300"
                  }`}
                />
                <InputOTPSlot
                  index={2}
                  className={`w-9 h-11 text-base ${
                    isOtherUserVerified
                      ? "bg-gray-50 border-gray-200"
                      : "border-gray-300"
                  }`}
                />
                <InputOTPSlot
                  index={3}
                  className={`w-9 h-11 text-base ${
                    isOtherUserVerified
                      ? "bg-gray-50 border-gray-200"
                      : "border-gray-300"
                  }`}
                />
                <InputOTPSlot
                  index={4}
                  className={`w-9 h-11 text-base ${
                    isOtherUserVerified
                      ? "bg-gray-50 border-gray-200"
                      : "border-gray-300"
                  }`}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Verify Button with dynamic states */}
          <button
            onClick={handleSubmitOtp}
            disabled={sending || isOtherUserVerified}
            className={`w-full ${
              isOtherUserVerified
                ? "bg-green-500 hover:bg-green-500 cursor-default"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-medium py-2 rounded text-xs transition-colors duration-200 font-sans`}
          >
            {sending
              ? "Verifying..."
              : isOtherUserVerified
              ? "✓ Verification Complete"
              : "Complete Verification"}
          </button>

          {/* Status messages */}
          {isOtherUserVerified && (
            <div className="mt-2 text-center">
              <p className="text-green-600 text-xs font-sans">
                You've successfully verified the other user!
              </p>
              {!isUserVerified && (
                <p className="text-gray-500 text-[10px] font-sans mt-0.5">
                  Waiting for them to verify your code...
                </p>
              )}
            </div>
          )}

          {!isOtherUserVerified && isUserVerified && (
            <div className="mt-2 text-center">
              <p className="text-blue-600 text-xs font-sans">
                They've verified you! Now enter their code above.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Now at bottom */}
      <div className="mt-auto pt-6 text-center">
        <p className="text-gray-400 text-[10px] font-sans">
          Findora Verification Protocol • 2026
        </p>
      </div>
    </div>
  );
};
