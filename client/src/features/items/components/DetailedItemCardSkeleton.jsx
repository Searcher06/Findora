import { Skeleton } from "@/components/ui/skeleton";

// Main skeleton component
export const DetailedItemCardSkeleton = () => {
  return (
    <div className="w-full mt-2 flex flex-col items-center">
      {/* Image skeleton */}
      <Skeleton className="w-[90%] h-64 border rounded-lg" />

      {/* Item info skeleton */}
      <div className="flex flex-col w-[90%]">
        {/* Title and status row */}
        <div className="flex justify-between mt-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Specific info list */}
        <div className="flex flex-col gap-1.5 mt-2.5">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex font-sans gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>

        {/* Reporter info skeleton */}
        <div className="flex flex-col mt-3 gap-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="flex gap-1 items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Button skeleton */}
      <Skeleton className="w-[70%] h-10 mt-5 rounded-md" />
    </div>
  );
};
