import { DetailedItemCard } from "../components/DetailedItemCard";
import { useSingleItem } from "../hooks/useSingleItemFetch";
import { DetailedItemCardSkeleton } from "../components/DetailedItemCardSkeleton";
import { useParams } from "react-router-dom";
export const ViewItem = () => {
  const { id } = useParams();
  const { item, loading, error } = useSingleItem(id);
  if (loading) {
    return <DetailedItemCardSkeleton />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!item) {
    return <div>Item not found</div>;
  }
  console.log(item);
  return (
    <div className="mt-14 flex flex-col">
      <DetailedItemCard item={item} />
    </div>
  );
};

// continue from here tomorrow
