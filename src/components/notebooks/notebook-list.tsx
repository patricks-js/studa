import { fetchNotebooks } from "@/lib/data";
import { NotebookCard } from "./notebook-card";
import { NotebookCreatorCard } from "./notebook-creator-card";

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
      <NotebookCreatorCard />
    </div>
  );
}
