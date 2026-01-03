import { Logo } from "./logo";
export const Loader = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Your app logo */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Themed loading */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-l-blue-500 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <p className="mt-6 text-gray-600 text-sm">
        Loading your secure environment
      </p>
    </div>
  );
};
