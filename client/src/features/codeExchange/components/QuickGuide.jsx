export const QuickGuide = () => (
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
);
