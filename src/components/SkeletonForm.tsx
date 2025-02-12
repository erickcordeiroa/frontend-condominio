import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonForm() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-[200px] mb-8" />
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-[100px] w-full rounded-xl" />
      </div>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>
    </div>
  )
}
