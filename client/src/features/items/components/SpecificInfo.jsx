export const SpecificInfo = ({ infotype, value }) => {
  return (
    <div className="flex font-sans gap-3">
      <p className="text-gray-600 text-[13px]">{infotype}</p>
      <p className=" text-[13px]">{value}</p>
    </div>
  );
};
