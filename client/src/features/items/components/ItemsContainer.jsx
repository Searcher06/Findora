import { ItemCard } from "./ItemCard";
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
  const placeholderImage = "/item-placeholder.svg";
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
                  image={current.image || placeholderImage}
                  description={current.description}
                  status={current.status}
                  category={current.category}
                  id={current._id}
                  key={current._id}
                />
              ))
              : (
                <div className="col-span-full w-full">
                  <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-indigo-200 bg-linear-to-br from-white to-violet-50/60 px-6 py-16 text-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 shadow-sm">
                      <Inbox className="h-8 w-8 text-indigo-500" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900">Nothing here yet</h3>
                      <p className="mt-1 max-w-xs text-sm text-slate-500">
                        Try adjusting your search, category, or date filter — or be the first to report an item.
                      </p>
                    </div>
                  </div>
                </div>
              )}
      </div>

      {!loading && !error && totalPages > 1 ? (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!pagination?.hasPrevPage}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-indigo-200 bg-white px-3 text-sm font-semibold text-indigo-900 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <div className="order-first w-full rounded-xl border border-indigo-200 bg-linear-to-r from-white to-violet-50 px-4 py-2 text-center text-sm font-semibold text-indigo-900 sm:order-0 sm:w-auto">
            Page {currentPage} of {totalPages}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={!pagination?.hasNextPage}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-indigo-200 bg-white px-3 text-sm font-semibold text-indigo-900 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
};
