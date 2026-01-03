import { Skeleton } from "@/components/ui/skeleton";

export const InputsFormSkeleton = ({ count = 3 }) => {
  return (
    <div className="w-full border rounded-lg p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-2">
          <Skeleton className="h-4 w-3/4 mb-1 bg-gray-200" />
          <Skeleton className="h-8 w-full bg-gray-200 rounded-sm" />
        </div>
      ))}
      <Skeleton className="h-9 w-full mt-3 bg-gray-200 rounded" />
    </div>
  );
};
