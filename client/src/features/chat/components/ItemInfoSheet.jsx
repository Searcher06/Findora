import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, X, ChevronRight } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

/**
 * Tappable info bar + bottom sheet showing the item involved in this chat.
 */
export const ItemInfoSheet = ({ item, requestType }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const placeholderImage = "/item-placeholder.svg";

  if (!item) return null;

  const isLost = item.status === "lost";
  const statusLabel = isLost ? "Lost" : "Found";
  const statusColor = isLost
    ? "bg-rose-500/90 text-white"
    : "bg-emerald-500/90 text-white";

  return (
    <>
      {/* Tappable info bar */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2.5 border-b border-slate-200/80 bg-slate-50/90 px-3 py-2 text-left transition active:bg-slate-100"
      >
        {/* Thumbnail */}
        <img
          src={item.image || placeholderImage}
          alt={item.name}
          className="h-9 w-9 shrink-0 rounded-lg border border-slate-200 object-cover"
        />

        {/* Name + status */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-slate-800">
            {item.name}
          </p>
          <p className="text-[10px] text-slate-400">{item.location}</p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColor}`}
        >
          {statusLabel}
        </span>

        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      </button>

      {/* Bottom sheet overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white shadow-2xl">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-5 pb-8 pt-2">
              {/* Item image */}
              <img
                src={item.image || placeholderImage}
                alt={item.name}
                className="mt-2 w-full rounded-2xl border border-slate-200 object-cover aspect-video"
              />

              {/* Name + status */}
              <div className="mt-4 flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-bold text-slate-900 leading-tight">
                  {item.name}
                </h2>
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${statusColor}`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* Meta */}
              <div className="mt-3 space-y-2">
                {item.location && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 shrink-0 text-violet-500" />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.dateLostOrFound && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays className="h-4 w-4 shrink-0 text-violet-500" />
                    <span>
                      {isLost ? "Lost on" : "Found on"}{" "}
                      {formatDate(item.dateLostOrFound)}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              )}

              {/* View full item button */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate(`/items/${item._id}`);
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white transition active:scale-[0.98]"
              >
                View Full Item
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
