import { fetchNotebookMaterials } from "@/lib/data";
import { MaterialCard } from "./material-card";

type Props = {
  notebookId: string;
};

export async function MaterialList({ notebookId }: Props) {
  const materials = await fetchNotebookMaterials(notebookId);

  return (
    <>
      {materials.length === 0 ? (
        <div className="w-full py-8 text-center">
          <p className="font-medium text-muted-foreground">
            Nenhum material processado neste notebook ainda. Cole seu primeiro
            texto acima para começar!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              id={material.id}
              title={material.title}
              createdAt={new Date(material.createdAt)}
              content={material.processedTextContent}
            />
          ))}
        </div>
      )}
    </>
  );
}
