import { NotebookList } from "@/components/notebooks/notebook-list";
import { NotebookListSkeleton } from "@/components/notebooks/notebook-list-skeleton";
import { Suspense } from "react";

export default async function NotebooksPage() {
  return (
    <>
      <header className="flex w-full items-center justify-between">
        <h3 className="mb-6 font-bold text-2xl">Seus Notebooks</h3>
      </header>
      <Suspense fallback={<NotebookListSkeleton />}>
        <NotebookList />
      </Suspense>
    </>
  );
}
