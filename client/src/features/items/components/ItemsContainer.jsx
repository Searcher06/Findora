import { ItemCard } from "./ItemCard";
import itemImage from "../item.png";
import { useItems } from "../hooks/useItems";
import { ItemCardSkeleton } from "./ItemCardSkeleton";
import { useEffect } from "react";
import { Inbox, ChevronLeft, ChevronRight } from "lucide-react";

export const ItemsContainer = ({
  className,
  filters = {},
  onMetaChange,
  onPageChange,
}) => {
  const { items, loading, error, pagination } = useItems(filters);

  useEffect(() => {
    onMetaChange?.({
      total: pagination?.total || 0,
      loading,
      error: Boolean(error),
      view: filters?.status || "lost",
      page: pagination?.page || 1,
      totalPages: pagination?.totalPages || 1,
    });
  }, [pagination, loading, error, filters?.status, onMetaChange]);

  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;

  const handlePrev = () => {
    if (pagination?.hasPrevPage) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.hasNextPage) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <div className={`${className} w-full`}>
      <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ItemCardSkeleton key={i} />)
          : error
            ? (
              <div className="col-span-full rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
                {error}
              </div>
            )
            : items?.length
              ? items.map((current) => (
                <ItemCard
                  name={current.name}
                  location={current.location}
                  date={current.dateReported}
                  image={itemImage}
                  description={current.description}
                  status={current.status}
                  id={current._id}
                  key={current._id}
                />
              ))
              : (
                <div className="col-span-full w-full rounded-2xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center">
                  <Inbox className="mx-auto h-10 w-10 text-slate-400" />
                  <h3 className="mt-4 font-display text-xl font-bold text-slate-900">No items match this filter</h3>
                  <p className="mt-1 text-sm text-slate-600">Try a different keyword, category, or date range.</p>
                </div>
              )}
      </div>

      {!loading && !error && totalPages > 1 ? (
        <div className="mt-7 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!pagination?.hasPrevPage}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Page {currentPage} of {totalPages}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={!pagination?.hasNextPage}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
};
