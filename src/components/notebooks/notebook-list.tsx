import { fetchNotebooks } from "@/lib/data";
import { Icons } from "../icons";
import { NotebookCard } from "./notebook-card";

export async function NotebookList() {
  const notebooks = await fetchNotebooks();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {notebooks.length === 0 ? (
        <div>Nenhum notebook encontrado</div>
      ) : (
        notebooks.map((notebook) => (
          <NotebookCard
            key={notebook.id}
            id={notebook.id}
            title={notebook.title}
            description={notebook.description}
            stats={{
              flashcards: 6,
              quizzes: 3,
              materials: 4,
            }}
            createdAt={notebook.createdAt}
          />
        ))
      )}
      <div className="flex h-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors duration-200 hover:border-secondary hover:bg-secondary/30">
        <p className="inline-flex items-center gap-1 font-medium text-muted-foreground">
          <Icons.add className="size-5 text-muted-foreground" />
          Adicionar novo notebook
        </p>
      </div>
    </div>
  );
}
