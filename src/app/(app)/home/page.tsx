import { getAllModulesAction } from "@/actions/actions";
import { FlashcardDeckCard } from "@/components/flashcard-deck-card";
import { ModuleCard } from "@/components/module-card";
import { auth } from "@/lib/auth";
import { subDays } from "date-fns";
import { headers } from "next/headers";

export default async function HomePage() {
  const [session, modules] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    getAllModulesAction(),
  ]);

  if (!session) {
    return <div>Você não está logado</div>;
  }

  return (
    <div className="space-y-8">
      <header className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-3xl leading-relaxed tracking-tight">
            Bom dia, {session.user.name}
          </h3>
          <p className="text-muted-foreground">
            Seja bem-vindo ao seu perfil! Aqui você pode gerenciar seus módulos
            e revisar seus progressos.
          </p>
        </div>
      </header>
      <section className="space-y-6">
        <h3 className="font-bold text-xl">Módulos recenter</h3>
        <div className="grid grid-cols-1 gap-6 rounded-3xl border p-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.length > 0 ? (
            modules
              .slice(0, 3)
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .map((m) => (
                <ModuleCard
                  key={m.id}
                  {...m}
                />
              ))
          ) : (
            <p>Você ainda não criou nenhum módulo.</p>
          )}
        </div>
      </section>
      <section className="space-y-6">
        <h3 className="mb-4 font-bold text-xl">Flashcards recentes</h3>
        <div className="grid grid-cols-1 gap-6 rounded-3xl border p-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <FlashcardDeckCard
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              title="Matemática"
              totalFlashcards={12}
              updatedAt={subDays(new Date(), i)}
              isAI={i % 2 === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
