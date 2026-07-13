import { Skeleton } from "@/components/ui/skeleton";

export const ItemCardSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      {/* Image */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />

      {/* Info */}
      <div className="p-2.5 space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};
