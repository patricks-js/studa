import Link from "next/link";
import { Suspense } from "react";

import { Icons } from "@/components/icons";
import { NotebookList } from "@/components/notebooks/notebook-list";
import { NotebookListSkeleton } from "@/components/notebooks/notebook-list-skeleton";
import { Button } from "@/components/ui/button";
import { verifySession } from "@/lib/server-utils";

export default async function HomePage() {
  const session = await verifySession();

  return (
    <div className="space-y-8">
      <header className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-3xl leading-relaxed tracking-tight">
            Olá, {session.user.name}!
          </h3>
          <p className="max-w-2xl text-muted-foreground">
            Aqui está um resumo de seus estudos. Você pode gerenciar seus
            notebooks, recursos e revisar seus progressos.
          </p>
        </div>
      </header>
      <section className="space-y-4 rounded-3xl border p-5">
        <header className="flex w-full items-center justify-between">
          <h3 className="font-medium text-lg">Notebooks recentes</h3>
          <Button
            variant="link"
            asChild
          >
            <Link href="/notebooks">
              Ver todos <Icons.arrowRight />
            </Link>
          </Button>
        </header>
        <Suspense fallback={<NotebookListSkeleton />}>
          <NotebookList />
        </Suspense>
      </section>
    </div>
  );
}
