import { useItemType } from "../context/ItemTypeContext";
import { FilterMenus } from "./FilterMenus";

export const TabsBar = ({ className }) => {
  const { bar, setBar } = useItemType();
  return (
    <div
      className={`${className} font-sans w-[97%] flex justify-between pr-1 h-7 border-b`}
    >
      <div className="w-[40%] text-[13px] flex justify-between">
        <p
          className={`h-7 border-b-2 ${bar == "lost" && "border-black"}`}
          onClick={() => {
            setBar("lost");
          }}
        >
          Lost
        </p>
        <p
          className={`h-7 border-b-2 ${bar == "found" && "border-black"}`}
          onClick={() => {
            setBar("found");
          }}
        >
          Found
        </p>
      </div>
      <FilterMenus />
    </div>
  );
};
