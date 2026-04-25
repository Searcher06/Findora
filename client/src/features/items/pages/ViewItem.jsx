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
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/35 to-white flex items-center justify-center px-4">
        <div className="pointer-events-none absolute -left-20 top-20 h-60 w-60 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="relative z-10 text-center">
          <p className="text-red-600 text-base sm:text-lg md:text-xl font-sans">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/35 to-white flex items-center justify-center px-4">
        <div className="pointer-events-none absolute -left-20 top-20 h-60 w-60 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="relative z-10 text-center">
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-sans">Item not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/35 to-white">
      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute -left-20 top-20 h-60 w-60 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <DetailedItemCard item={item} />
      </div>
    </div>
  );
};
