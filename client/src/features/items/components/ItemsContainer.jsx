import { ItemCard } from "./ItemCard";
import itemImage from "../item.png";
import { useItemType } from "../context/ItemTypeContext";
import { useItems } from "../hooks/useItems";
import { ItemCardSkeleton } from "./ItemCardSkeleton";

export const ItemsContainer = ({
  className,
  filters = {},
  searchQuery = "",
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

  return (
    <div
      className={`${className} w-full flex flex-wrap justify-center gap-2.5`}
    >
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <ItemCardSkeleton key={i} />)
        : error
          ? error
          : bar == "lost"
            ? filterItemsBySearch(items)
                ?.filter((current) => {
                  return current.status == "lost";
                })
                .map((current) => (
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
            : filterItemsBySearch(items)
                ?.filter((current) => {
                  return current.status == bar;
                })
                .map((current) => (
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
                ))}
    </div>
  );
};
