import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";

export default function HomePage() {
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

  const reviews = [
    { id: 1, subject: "Matemática", progress: 75 },
    { id: 2, subject: "Física", progress: 45 },
    { id: 3, subject: "Química", progress: 90 },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main content */}
        <main className="flex-1">
          <h3 className="mb-6 font-bold text-2xl">Suas matérias</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </main>

        <aside className="w-full lg:w-[288px]">
          <Card className="bg-transparent shadow-md">
            <CardHeader>
              <CardTitle>Review Progress</CardTitle>
              <CardDescription>Your current review status</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>{review.subject}</span>
                    <span className="text-muted-foreground">
                      {review.progress}%
                    </span>
                  </div>
                  <Progress value={review.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
