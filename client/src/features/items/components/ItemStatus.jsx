export const ItemStatus = ({ status }) => {
  return (
    <p
      className={`${
        status == "lost" ? "bg-red-600/20" : "bg-green-600/20"
      } font-sans text-[12px] px-2 py-1 rounded-md ${
        status == "lost" ? "text-red-600" : "text-green-600"
      }`}
    >
      {status}
    </p>
  );
};
