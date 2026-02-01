import { MapPin, CalendarDays } from "lucide-react";
import image from "../../items/item.png";
import { ItemStatus } from "@/features/items";
import { useSingleItem } from "@/features/items";
import { formatDate } from "@/utils/formatDate";

export const RequestDetail = ({
  requestLoading,
  requestError,
  request,
  isDesktopSidebar = false,
}) => {
  const { item, loading, error } = useSingleItem(request?.itemId?._id);

  if (loading || requestLoading) {
    return (
      <div
        className={`flex items-center justify-center ${isDesktopSidebar ? "py-8" : "py-4"}`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requestError) {
    return (
      <div className={`text-center ${isDesktopSidebar ? "py-8" : "py-4"}`}>
        <p className="text-sm text-red-600">{requestError}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center ${isDesktopSidebar ? "py-8" : "py-4"}`}>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  // Desktop Sidebar Layout
  if (isDesktopSidebar) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Item Details
          </h2>
          <h1 className="font-semibold font-display text-xl text-gray-900 mb-2">
            {item.name}
          </h1>
          <ItemStatus status={item.status} className="inline-block" />
        </div>

        {/* Image */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <img
            src={item.image || image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Location
              </p>
              <p className="text-sm font-medium text-gray-900 font-sans">
                {item.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <CalendarDays className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Date {item.status === "lost" ? "Lost" : "Found"}
              </p>
              <p className="text-sm font-medium text-gray-900 font-sans">
                {formatDate(item.dateLostOrFound)}
              </p>
            </div>
          </div>

          {item.description && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Description
              </p>
              <p className="text-sm text-gray-700 font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile/Tablet Layout (Original)
  return (
    <div className="mt-2 pb-3 sm:pb-3.5 border-b">
      <div className="flex justify-between items-center">
        <div className="flex-1 min-w-0 pr-3">
          <h1 className="font-medium font-display text-sm sm:text-[15px] truncate">
            {item.name}
          </h1>
          <ItemStatus status={item.status} className="" />
        </div>
        <div className="shrink-0">
          <img
            src={item.image || image}
            alt="Item Image"
            className="h-14 w-16 sm:h-15 sm:w-17 rounded object-cover"
          />
        </div>
      </div>
      <div className="mt-2 flex justify-between gap-2 text-gray-600">
        <p className="flex items-center font-sans text-[11px] sm:text-xs line-clamp-1">
          <MapPin
            size={16}
            className="text-white fill-gray-500 shrink-0 mr-1"
          />
          {item.location}
        </p>
        <p className="flex items-center font-sans text-[11px] sm:text-xs shrink-0">
          <CalendarDays
            size={16}
            className="text-white fill-gray-500 shrink-0 mr-1"
          />
          {formatDate(item.dateLostOrFound)}
        </p>
      </div>
    </div>
  );
};
