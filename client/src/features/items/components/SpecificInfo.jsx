export const SpecificInfo = ({ infotype, value, size = "default" }) => {
  if (size === "lg") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
          {infotype}
        </p>
        <p className="text-gray-900 text-lg font-medium">{value}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 items-baseline flex-wrap">
      <p className="text-gray-600 text-sm font-medium">{infotype}:</p>
      <p className="text-gray-800 text-sm">{value}</p>
    </div>
  );
};
