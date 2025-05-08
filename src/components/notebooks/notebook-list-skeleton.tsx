import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function NotebookListSkeleton() {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "block",
            i === 2 && "hidden md:block",
            i === 3 && "hidden xl:block",
          )}
        >
          <Card className="h-full gap-4">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-3/4" />
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between">
              <div className="mb-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="mt-auto flex flex-wrap gap-2 *:h-6 *:w-10 *:rounded-md">
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
