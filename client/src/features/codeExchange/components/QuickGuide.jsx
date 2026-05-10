export const QuickGuide = () => (
  <div className="mb-4 sm:mb-5 md:mb-6 rounded-2xl sm:rounded-3xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 md:py-5 max-w-xs w-full mx-auto shadow-[0_35px_90px_-70px_rgba(79,70,229,0.6)]">
    <p className="text-gray-900 text-xs sm:text-sm md:text-base font-bold font-display mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
      <span className="inline-flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-indigo-500 text-white text-[10px] sm:text-xs">
        📋
      </span>
      How to verify your meeting:
    </p>
    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
      <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
        <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 text-white text-[10px] sm:text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-md">
          1
        </div>
        <p className="text-gray-800 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
          <span className="font-semibold text-gray-900">Share</span> your 5-digit code below
        </p>
      </div>
      <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
        <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 text-white text-[10px] sm:text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-md">
          2
        </div>
        <p className="text-gray-800 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
          <span className="font-semibold text-gray-900">Enter</span> their code here
        </p>
      </div>
      <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
        <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 text-white text-[10px] sm:text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-md">
          3
        </div>
        <p className="text-gray-800 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
          <span className="font-semibold text-gray-900">Submit</span> to complete verification
        </p>
      </div>
    </div>
  </div>
);
