import { CheckCircle } from "lucide-react";

export const SuccessScreen = ({ request, navigate }) => (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50/50 via-emerald-50/30 to-white text-gray-900 px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col items-center justify-center">
    {/* Decorative blur circles */}
    <div className="pointer-events-none absolute -left-20 top-20 h-60 w-60 rounded-full bg-green-300/15 blur-3xl" />
    <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-emerald-200/15 blur-3xl" />
    <div className="mb-4 sm:mb-5 md:mb-6 flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 blur-xl opacity-50 scale-150" />
        <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
          <CheckCircle className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white" />
        </div>
      </div>
    </div>

    <div className="relative z-10 text-center mb-4 sm:mb-5 md:mb-6 max-w-md">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-display mb-1.5 sm:mb-2 md:mb-3">Handover Complete</h1>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base font-sans mb-3 sm:mb-4 md:mb-5">
        The item has been successfully returned and recorded securely.
      </p>

      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] mb-3 sm:mb-4 md:mb-5">
        <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
          <div className="flex items-center justify-between pb-2 sm:pb-2.5 md:pb-3 border-b border-slate-100">
            <span className="text-gray-500 text-xs sm:text-sm font-sans">Item</span>
            <span className="text-gray-900 text-xs sm:text-sm font-bold font-sans">{request?.itemId?.name || "Item Name"}</span>
          </div>
          <div className="flex items-center justify-between pb-2 sm:pb-2.5 md:pb-3 border-b border-slate-100">
            <span className="text-gray-500 text-xs sm:text-sm font-sans">Finder</span>
            <span className="text-gray-900 text-xs sm:text-sm font-bold font-sans">{request?.finderId?.firstName || "User"}</span>
          </div>
          <div className="flex items-center justify-between pb-2 sm:pb-2.5 md:pb-3 border-b border-slate-100">
            <span className="text-gray-500 text-xs sm:text-sm font-sans">Claimer</span>
            <span className="text-gray-900 text-xs sm:text-sm font-bold font-sans">{request?.claimerId?.firstName || "User"}</span>
          </div>
          <div className="pt-2 sm:pt-2.5 md:pt-3 bg-gradient-to-r from-green-50 to-emerald-50 -m-4 sm:-m-5 md:-m-6 mt-2 sm:mt-2.5 md:mt-3 p-3 sm:p-4 rounded-b-2xl sm:rounded-b-3xl flex items-center gap-1.5 sm:gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-700 text-xs sm:text-sm md:text-base font-bold font-sans">Both parties verified</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl sm:rounded-2xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] p-3 sm:p-3.5 md:p-4">
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 font-display mb-2 sm:mb-2.5 md:mb-3">What's Next?</h3>
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] sm:text-xs font-bold">
              ✓
            </div>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base font-sans">Exchange recorded in secure database</p>
          </div>
          <div className="flex items-start gap-1.5 sm:gap-2">
            <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] sm:text-xs font-bold">
              ✓
            </div>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base font-sans">You can close this or go to Home page</p>
          </div>
        </div>
      </div>
    </div>

    <button
      onClick={() => navigate("/")}
      className="relative z-10 mt-4 sm:mt-5 md:mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-6 sm:px-7 md:px-8 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base transition-all duration-200 font-sans shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Go to Home
    </button>

    <div className="relative z-10 mt-6 sm:mt-7 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-slate-200 text-center">
      <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm font-sans">
        ✓ Transaction securely recorded • Findora Verification • 2026
      </p>
    </div>
  </div>
);
