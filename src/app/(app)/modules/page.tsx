import { ModuleCard } from "@/components/module-card";

export default function ModulesPage() {
  const modules = [
    {
      id: "1",
      title: "Matemática",
      description: "Álgebra, Cálculo e Estatística",
    },
    { id: "2", title: "Física", description: "Mecânica e Termodinâmica" },
    {
      id: "3",
      title: "Química",
      description: "Química Orgânica e Inorgânica",
    },
    { id: "4", title: "Biologia", description: "Biologia Celular e Genética" },
  ];

  return (
    <>
      <h3 className="mb-6 font-bold text-2xl">Seus Módulos</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((m) => (
          <ModuleCard
            key={m.id}
            {...m}
          />
        ))}
      </div>
    </>
  );
}
