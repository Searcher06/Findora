import { CheckCircle } from "lucide-react";

export const SuccessScreen = ({ request, navigate }) => (
  <div className="min-h-screen mt-14 bg-linear-to-b from-green-50 to-white text-gray-900 p-4 flex flex-col items-center justify-center">
    <div className="mb-5">
      <div className="relative">
        <div className="w-20 h-20 bg-linear-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>

    <div className="text-center mb-6 max-w-xs">
      <h1 className="text-xl font-bold text-gray-900 font-display mb-2">
        Handover Complete
      </h1>
      <p className="text-gray-600 text-sm font-sans mb-3">
        The item has been successfully returned.
      </p>

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
            <span className="text-gray-500 text-xs font-sans">Claimer:</span>
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

    <button
      onClick={() => navigate("/")}
      className="mt-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-6 rounded-lg text-xs transition-all duration-200 font-sans shadow-sm hover:shadow"
    >
      Go to Home
    </button>

    <div className="mt-8 pt-4 border-t border-gray-200 text-center">
      <p className="text-gray-400 text-[10px] font-sans">
        Transaction securely recorded • Findora Verification • 2026
      </p>
    </div>
  </div>
);
