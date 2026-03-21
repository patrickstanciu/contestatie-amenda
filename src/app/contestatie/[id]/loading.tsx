import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ContestatieLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-3">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="h-9 w-36" />
      </div>

      {/* Estimare sanse card */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-52" />
            </div>
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>

      {/* Text editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className={`h-4 ${i % 5 === 4 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next steps card */}
      <Card>
        <CardHeader><Skeleton className="h-5 w-44" /></CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-6 w-6 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
