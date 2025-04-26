import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  getAllResourcesByModuleIdAction,
  getFlashcardDecksByModuleAction,
  getModuleByIdAction,
} from "@/actions/actions";
import { FlashcardDeckCard } from "@/components/flashcard-deck-card";
import { FlashcardsCreator } from "@/components/flashcards-creator";
import { ResourceCard } from "@/components/resource-card";
import { ResourceCreator } from "@/components/resource-creator";
import { Separator } from "@/components/ui/separator";

type Params = {
  params: Promise<{
    moduleId: string;
  }>;
};

export default async function ModulePage({ params }: Params) {
  const { moduleId } = await params;

  const [m, resources, decks] = await Promise.all([
    getModuleByIdAction(moduleId),
    getAllResourcesByModuleIdAction(moduleId),
    getFlashcardDecksByModuleAction(moduleId),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-bold text-2xl">{m.title}</h1>
        <p className="text-muted-foreground text-sm">
          Criado{" "}
          {formatDistanceToNow(new Date(m.createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
      </header>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg tracking-tight">Recursos</h2>
          <ResourceCreator moduleId={moduleId} />
        </div>
        <Separator />
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                createdAt={new Date(resource.createdAt)}
                content={resource.content}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-40 items-center justify-center p-4">
            <p className="font-medium text-muted-foreground">
              Nenhum recurso adicionado.
            </p>
          </div>
        )}
      </section>
      <section className="space-y-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-medium text-lg tracking-tight">Flashcards</h2>
          <FlashcardsCreator moduleId={moduleId} />
        </div>
        <Separator />
        {}
        {Object.keys(decks).length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.keys(decks).map((date) => (
              <FlashcardDeckCard
                key={date}
                moduleId={moduleId}
                totalFlashcards={decks[date].length}
                createdAt={new Date(date)}
                createdByAI
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-40 items-center justify-center p-4">
            <p className="font-medium text-muted-foreground">
              Nenhum flashcard gerado.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
