import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const EnterCodeSection = ({
  otp,
  setOtp,
  isOtherUserVerified,
  isUserVerified,
  handleSubmitOtp,
  sending,
  buttonText = "Complete Verification",
}) => (
  <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 max-w-sm w-full shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
    <h2 className="text-xs sm:text-sm md:text-base font-semibold mb-1 sm:mb-1.5 text-center font-display text-gray-900">
      Enter their 5-digit code
    </h2>
    <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 text-center font-sans">Type the code they shared with you</p>

    <div className="flex justify-center mb-4 sm:mb-5 bg-gradient-to-b from-indigo-50 to-violet-50/50 p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border border-indigo-100">
      <InputOTP maxLength={5} value={otp} onChange={setOtp} disabled={isOtherUserVerified}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4].map((index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={`w-8 h-10 sm:w-9 md:w-11 sm:h-12 md:h-14 text-base sm:text-lg md:text-xl font-bold rounded-lg border-2 transition-all ${
                isOtherUserVerified
                  ? "bg-gray-50 border-gray-200 text-gray-400"
                  : "border-violet-200 focus:border-indigo-500 focus:ring-2 focus:ring-violet-100"
              }`}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>

    <button
      onClick={handleSubmitOtp}
      disabled={sending || isOtherUserVerified}
      className={`w-full font-medium py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base transition-all duration-200 font-sans ${
        isOtherUserVerified
          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white cursor-default shadow-md"
          : "bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-md hover:shadow-lg"
      }`}
    >
      {sending ? "Verifying..." : isOtherUserVerified ? "✓ Verification Complete" : buttonText}
    </button>

    {isOtherUserVerified && (
      <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-center">
        <p className="text-green-700 text-xs sm:text-sm md:text-base font-medium font-sans">You've successfully verified the other user!</p>
        {!isUserVerified && (
          <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm font-sans mt-1">Waiting for them to verify your code...</p>
        )}
      </div>
    )}

    {!isOtherUserVerified && isUserVerified && (
      <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 text-center">
        <p className="text-indigo-700 text-xs sm:text-sm md:text-base font-medium font-sans">
          They've verified you! Now enter their code above.
        </p>
      </div>
    )}
  </div>
);
