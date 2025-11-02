import { ItemStatus } from "./ItemStatus";
import { ReporterInfo } from "./ReporterInfo";
import { SpecificInfo } from "./SpecificInfo";

export const ItemInfo = () => {
  return (
    <div className="flex flex-col w-[90%]">
      <div className="flex justify-between mt-3">
        <h1 className="font-display font-bold text-[18px]">Black Hp Laptop</h1>
        <ItemStatus status={"Found"} />
      </div>

      <div className="flex flex-col gap-1.5 mt-2.5">
        <SpecificInfo infotype={"Category"} value={"Bags & Accessories"} />
        <SpecificInfo
          infotype={"Location"}
          value={"Department of Software engineering"}
        />
        <SpecificInfo infotype={"Date found"} value={"October 26, 2025"} />
        <SpecificInfo infotype={"Date posted"} value={"October 28, 2025"} />
        <SpecificInfo
          infotype={"Description"}
          value={
            "A black HP laptop with 2 ports last seen during a lecture room"
          }
        />
      </div>

      <ReporterInfo />
    </div>
  );
};
