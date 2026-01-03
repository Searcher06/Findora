import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="flex gap-4 items-start p-4 border border-gray-200 rounded-lg bg-white">
      {/* Icon skeleton */}
      <Skeleton className="w-10 h-10 rounded-lg" />

      {/* Content skeleton */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* Header with status badge and title skeleton */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Footer with timestamp and button skeleton */}
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
