import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AccountLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Profile card */}
      <Card>
        <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full shrink-0" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
          <Skeleton className="h-10 w-32 rounded-md" />
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader><Skeleton className="h-5 w-28" /></CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
