import { FilterMenus } from "./FilterMenus";

export const TabsBar = ({ className }) => {
  return (
    <div
      className={`${className} font-sans w-[97%] flex justify-between pr-1 h-7 border-b`}
    >
      <div className="w-[40%] text-[13px] flex justify-between">
        <p className="h-7 border-b-2 border-black">Lost</p>
        <p className="h-7 border-b-2">Found</p>
      </div>
      <FilterMenus />
    </div>
  );
};
