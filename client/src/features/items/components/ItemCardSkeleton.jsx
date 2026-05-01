import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ItemCardSkeleton = () => {
  return (
    <Card className="w-full max-w-[320px] overflow-hidden rounded-3xl border border-sky-100">
      <div className="flex flex-col gap-3 p-3.5">
        {/* Image placeholder */}
        <Skeleton className="h-36 w-full rounded-2xl" />

        {/* Name */}
        <Skeleton className="h-4.5 w-3/4" />

        {/* Description */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />

        {/* Location */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        {/* Button */}
        <Skeleton className="mt-1 h-9 w-full rounded-xl" />
      </div>
    </Card>
  );
};
