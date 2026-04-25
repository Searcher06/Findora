export const SpecificInfo = ({ infotype, value, size = "default" }) => {
  if (size === "lg") {
    return (
      <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
        <p className="text-gray-600 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em]">
          {infotype}
        </p>
        <p className="text-gray-900 text-base sm:text-lg md:text-xl font-semibold">{value}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 sm:gap-2.5 items-baseline flex-wrap">
      <p className="text-gray-700 text-xs sm:text-sm md:text-base font-semibold">{infotype}:</p>
      <p className="text-gray-800 text-xs sm:text-sm md:text-base">{value}</p>
    </div>
  );
};
