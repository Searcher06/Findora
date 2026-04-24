import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ItemCardSkeleton = () => {
  return (
    <Card className="w-full max-w-[340px] overflow-hidden rounded-2xl border border-slate-200/90">
      <div className="flex flex-col gap-3 p-4">
        {/* Image placeholder */}
        <Skeleton className="h-44 w-full rounded-xl" />

        {/* Name */}
        <Skeleton className="h-5 w-3/4" />

        {/* Description */}
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />

        {/* Location */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3.5 w-1/2" />
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3.5 w-1/3" />
        </div>

        {/* Button */}
        <Skeleton className="mt-2 h-10 w-full rounded-xl" />
      </div>
    </Card>
  );
};
