import { ItemCard } from "./ItemCard";
import itemImage from "../item.png";
import { useItemType } from "../context/ItemTypeContext";
import { useItems } from "../hooks/useItems";
import { ItemCardSkeleton } from "./ItemCardSkeleton";
import { useEffect, useMemo } from "react";
import { Inbox } from "lucide-react";

export const ItemsContainer = ({
  className,
  filters = {},
  searchQuery = "",
  onMetaChange,
}) => {
  const { bar } = useItemType();
  const { items, loading, error } = useItems(filters);

  const filterItemsBySearch = (itemsList = []) => {
    const q = String(searchQuery || "")
      .trim()
      .toLowerCase();
    if (!q) return itemsList;
    return itemsList.filter((item) => {
      return (
        String(item.name || "")
          .toLowerCase()
          .includes(q) ||
        String(item.description || "")
          .toLowerCase()
          .includes(q) ||
        String(item.location || "")
          .toLowerCase()
          .includes(q) ||
        String(item.category || "")
          .toLowerCase()
          .includes(q)
      );
    });
  };

  const filteredItems = useMemo(() => {
    const list = filterItemsBySearch(items || []);
    if (bar === "lost") {
      return list?.filter((current) => current.status === "lost");
    }
    return list?.filter((current) => current.status === bar);
  }, [items, searchQuery, bar]);

  useEffect(() => {
    onMetaChange?.({
      total: filteredItems?.length || 0,
      loading,
      error: Boolean(error),
      view: bar,
    });
  }, [filteredItems, loading, error, bar, onMetaChange]);

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
            : filteredItems?.length
              ? filteredItems.map((current) => (
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
    </div>
  );
};
