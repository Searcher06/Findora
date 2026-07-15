import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton = () => (
  <div className="flex items-start gap-3 px-4 py-4">
    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-3.5 w-44" />
        <Skeleton className="h-3 w-10 shrink-0" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

export default NotificationSkeleton;
