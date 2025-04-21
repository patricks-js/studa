import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SubjectsPage() {
  const subjects = [
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
      <h3 className="mb-6 font-bold text-2xl">Todas as matérias</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="transition-colors hover:bg-muted/50"
          >
            <CardHeader>
              <CardTitle>{subject.title}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <a
                href={`/subjects/${subject.id}`}
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
