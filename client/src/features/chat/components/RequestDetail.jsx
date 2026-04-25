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
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
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
      <div className="space-y-5">
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Item Details
          </h2>
          <h1 className="mb-2 font-display text-xl font-bold text-slate-900">
            {item.name}
          </h1>
          <ItemStatus status={item.status} className="inline-block" />
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <img
            src={item.image || image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Location
              </p>
              <p className="font-sans text-sm font-medium text-slate-900">
                {item.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date {item.status === "lost" ? "Lost" : "Found"}
              </p>
              <p className="font-sans text-sm font-medium text-slate-900">
                {formatDate(item.dateLostOrFound)}
              </p>
            </div>
          </div>

          {item.description && (
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Description
              </p>
              <p className="font-sans text-sm leading-relaxed text-slate-700">
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
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1 pr-3">
          <h1 className="truncate font-display text-sm font-semibold text-slate-900 sm:text-[15px]">
            {item.name}
          </h1>
          <ItemStatus status={item.status} className="" />
        </div>
        <div className="shrink-0">
          <img
            src={item.image || image}
            alt="Item Image"
            className="h-14 w-16 rounded-lg border border-slate-200 object-cover sm:h-16 sm:w-[74px]"
          />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-slate-600">
        <p className="line-clamp-1 flex items-center rounded-lg bg-slate-50 px-2 py-1 font-sans text-[11px] sm:text-xs">
          <MapPin
            size={16}
            className="mr-1 shrink-0 fill-slate-500 text-white"
          />
          {item.location}
        </p>
        <p className="flex items-center rounded-lg bg-slate-50 px-2 py-1 font-sans text-[11px] sm:text-xs">
          <CalendarDays
            size={16}
            className="mr-1 shrink-0 fill-slate-500 text-white"
          />
          {formatDate(item.dateLostOrFound)}
        </p>
      </div>
    </div>
  );
};
