export const VerificationHeader = ({ title, subtitle }) => (
  <div className="text-center mb-4 sm:mb-5 md:mb-6 pt-2 sm:pt-3 md:pt-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-display tracking-tight">{title}</h1>
    <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2 font-sans">{subtitle}</p>
  </div>
);
