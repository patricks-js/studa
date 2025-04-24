import { getAllModulesAction } from "@/actions/actions";
import { CreateModuleDialog } from "@/components/create-module-dialog";
import { ModuleCard } from "@/components/module-card";

export default async function ModulesPage() {
  const modules = await getAllModulesAction();

  return (
    <>
      <header className="flex w-full items-center justify-between">
        <h3 className="mb-6 font-bold text-2xl">Seus Módulos</h3>
        <CreateModuleDialog />
      </header>
      {modules.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((m) => (
            <ModuleCard
              key={m.id}
              {...m}
            />
          ))}
        </div>
      ) : (
        <div className="mt-20 flex w-full items-center justify-center">
          <p className="text-center text-muted-foreground text-sm">
            Você ainda não criou nenhum módulo.
          </p>
        </div>
      )}
    </>
  );
}
