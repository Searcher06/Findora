export const YourCodeSection = ({
  userCode,
  isUserVerified,
  codeType = "Your 5-digit code",
}) => (
  <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 max-w-xs w-full shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
    <div className="text-center">
      <h3 className="font-semibold mb-2 sm:mb-3 text-xs sm:text-sm md:text-base font-display text-gray-900">
        {codeType}
      </h3>
      <div className="mb-3 sm:mb-4">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 font-mono tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          {userCode}
        </p>
        <div className="space-y-1 sm:space-y-1.5">
          <p className="text-gray-700 text-xs sm:text-sm md:text-base font-sans font-medium">
            Share this with the other person
          </p>
          <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm font-sans">
            Show on screen or read aloud
          </p>
        </div>
      </div>

      {isUserVerified && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50 -m-4 sm:-m-5 md:-m-6 mt-3 sm:mt-4 p-3 sm:p-4 rounded-b-2xl sm:rounded-b-3xl">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-700 text-xs sm:text-sm md:text-base font-medium font-sans">
              ✓ The other user has verified you
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);
