import { fetchNotebooks } from "@/lib/data";
import { NotebookCard } from "./notebook-card";
import { NotebookCreatorCard } from "./notebook-creator-card";

export async function NotebookList() {
  const notebooks = await fetchNotebooks();

  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
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
      <NotebookCreatorCard />
    </div>
  );
}
