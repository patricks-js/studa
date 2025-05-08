import { notFound } from "next/navigation";

import { Icons } from "@/components/icons";
import { AddMaterialForm } from "@/components/materials/add-material-form";
import { MaterialList } from "@/components/materials/material-list";
import { Button } from "@/components/ui/button";
import { fetchNotebookById } from "@/lib/data";

type PageProps = {
  params: Promise<{ notebookId: string }>;
};

export default async function NotebookPage({ params }: PageProps) {
  const { notebookId } = await params;

  const notebook = await fetchNotebookById(notebookId);

  if (!notebook) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <header className="flex w-full items-start justify-between">
        <div className="w-full max-w-2xl space-y-2">
          <h2 className="font-medium text-2xl tracking-tight">
            {notebook.title}
          </h2>
          <p className="text-muted-foreground text-sm">
            {notebook.description}
          </p>
        </div>
        <Button variant="outline">
          <Icons.add />
          Adicionar novo recurso
        </Button>
      </header>

      <section className="space-y-4">
        <h3 className="font-medium text-lg">Adicionar Novo Conteúdo</h3>
        <AddMaterialForm notebookId={notebookId} />
      </section>

      <section className="flex flex-col items-start gap-4">
        <h3 className="font-medium text-lg">Materiais Processados</h3>
        <MaterialList notebookId={notebookId} />
      </section>
    </div>
  );
}
