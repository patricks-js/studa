import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ModulesPage() {
  const modules = [
    {
      id: 1,
      title: "Matemática",
      description: "Álgebra, Cálculo e Estatística",
    },
    { id: 2, title: "Física", description: "Mecânica e Termodinâmica" },
    {
      id: 3,
      title: "Química",
      description: "Química Orgânica e Inorgânica",
    },
    { id: 4, title: "Biologia", description: "Biologia Celular e Genética" },
  ];

  return (
    <>
      <h3 className="mb-6 font-bold text-2xl">Seus Módulos</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className="transition-colors hover:bg-muted/50"
          >
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <a
                href={`/modules/${module.id}`}
                className="text-muted-foreground text-sm hover:text-primary"
              >
                Ver matéria →
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
