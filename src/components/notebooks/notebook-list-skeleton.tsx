export function NotebookListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse rounded-lg bg-muted-foreground/10 p-4" />
      <div className="animate-pulse rounded-lg bg-muted-foreground/10 p-4" />
      <p className="text-muted-foreground">
        <span className="inline-block h-4 w-full animate-pulse bg-muted-foreground/10" />
      </p>
    </div>
  );
}
