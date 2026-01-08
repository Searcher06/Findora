import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const EnterCodeSection = ({
  otp,
  setOtp,
  isOtherUserVerified,
  isUserVerified,
  handleSubmitOtp,
  sending,
  buttonText = "Complete Verification",
}) => (
  <div className="bg-white rounded-lg p-4 max-w-xs w-full border border-gray-200 shadow-xs">
    <h2 className="text-sm font-semibold mb-1.5 text-center font-display text-gray-800">
      Enter their 5-digit code
    </h2>
    <p className="text-gray-500 text-xs mb-3 text-center font-sans">
      Type the code they shared with you
    </p>

    <div className="flex justify-center mb-4">
      <InputOTP
        maxLength={5}
        value={otp}
        onChange={setOtp}
        disabled={isOtherUserVerified}
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4].map((index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={`w-9 h-11 text-base ${
                isOtherUserVerified
                  ? "bg-gray-50 border-gray-200"
                  : "border-gray-300"
              }`}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>

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
        : buttonText}
    </button>

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
);
