import { MapPin, CalendarDays } from "lucide-react";
import image from "../../items/item.png";
import { ItemStatus } from "@/features/items";
export const RequestDetail = () => {
  return (
    <div className="mt-2 pb-3.5 border-b">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-medium font-display text-[15px]">
            Blue Hydro Flask
          </h1>
          <ItemStatus status={"found"} className={""} />
        </div>
        <div className="">
          <img src={image} alt="Item Image" className="h-15 w-17" />
        </div>
      </div>
      <div className="mt-2 flex justify-between text-gray-600">
        <p className="flex items-center font-sans text-xs">
          <MapPin
            size={17}
            className="text-white fill-gray-500 flex-shrink-0"
          />{" "}
          Library Entrance
        </p>
        <p className="flex items-center font-sans text-xs">
          <CalendarDays
            size={17}
            className="text-white fill-gray-500 flex-shrink-0"
          />
          {"  "}
          September 11, 2025
        </p>
      </div>
    </div>
  );
};
