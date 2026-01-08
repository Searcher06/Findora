export const YourCodeSection = ({
  userCode,
  isUserVerified,
  codeType = "Your 5-digit code",
}) => (
  <div className="bg-white rounded-lg p-4 max-w-xs w-full border border-gray-200 shadow-xs">
    <div className="text-center">
      <h3 className="font-semibold mb-2 text-xs font-display text-gray-800">
        {codeType}
      </h3>
      <div className="mb-2">
        <p className="text-lg font-bold text-gray-900 font-mono tracking-wider mb-1">
          {userCode}
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
);
