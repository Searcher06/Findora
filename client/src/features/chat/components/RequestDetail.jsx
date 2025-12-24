import { MapPin, CalendarDays } from "lucide-react";
import image from "../../items/item.png";
import { ItemStatus } from "@/features/items";
import { useSingleItem } from "@/features/items";
import { formatDate } from "@/utils/formatDate";
export const RequestDetail = ({ requestLoading, requestError, request }) => {
  const { item, loading, error } = useSingleItem(request?.itemId?._id);
  if (loading || requestLoading) {
    return <h2>Fetching</h2>;
  } else if (requestError) {
    return <h2>{requestError}</h2>;
  } else if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="mt-2 pb-3.5 border-b">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-medium font-display text-[15px]">{item.name}</h1>
          <ItemStatus status={item.status} className={""} />
        </div>
        <div className="">
          <img
            src={item.image || image}
            alt="Item Image"
            className="h-15 w-17"
          />
        </div>
      </div>
      <div className="mt-2 flex justify-between text-gray-600">
        <p className="flex items-center font-sans text-xs line-clamp-1">
          <MapPin
            size={17}
            className="text-white fill-gray-500 flex-shrink-0"
          />{" "}
          {item.location}
        </p>
        <p className="flex items-center font-sans text-xs">
          <CalendarDays
            size={17}
            className="text-white fill-gray-500 flex-shrink-0"
          />
          {"  "}
          {formatDate(item.dateLostOrFound)}
        </p>
      </div>
    </div>
  );
};
