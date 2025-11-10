import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ItemCardSkeleton = () => {
  return (
    <Card className="w-60 shadow-gray-300 pb-3">
      <div className="w-full pr-4 pl-4 pt-0 flex flex-col gap-2">
        {/* Image placeholder */}
        <Skeleton className="w-full h-36 rounded-md" />

        {/* Name */}
        <Skeleton className="h-4 w-3/4" />

        {/* Description */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />

        {/* Location */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3" /> {/* icon */}
          <Skeleton className="h-3 w-1/2" />
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3" /> {/* icon */}
          <Skeleton className="h-3 w-1/3" />
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-full rounded-md mt-1" />
      </div>
    </Card>
  );
};
