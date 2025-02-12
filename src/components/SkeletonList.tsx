import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonList() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}