import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6 space-y-2">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[0, 1].map((i) => (
          <Card key={i}>
            <CardHeader><Skeleton className="h-5 w-36" /></CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="space-y-1.5">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent contestatii table */}
      <Card>
        <CardHeader><Skeleton className="h-5 w-48" /></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-24 ml-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-8 ml-auto" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
