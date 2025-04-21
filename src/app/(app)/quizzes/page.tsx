import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const quizzes = [
  {
    id: 1,
    title: "Álgebra Linear - Quiz 1",
    subject: "Matemática",
    score: 85,
    maxScore: 100,
    difficulty: "Médio",
    questions: 10,
    completed: true,
  },
  {
    id: 2,
    title: "Termodinâmica - Leis",
    subject: "Física",
    score: 92,
    maxScore: 100,
    difficulty: "Difícil",
    questions: 15,
    completed: true,
  },
  // Add more mock quizzes as needed
];

const subjects = [
  { id: 1, name: "Todas" },
  { id: 2, name: "Matemática" },
  { id: 3, name: "Física" },
  { id: 4, name: "Química" },
];

const sortOptions = [
  { id: "score", name: "Nota" },
  { id: "difficulty", name: "Dificuldade" },
  { id: "date", name: "Data" },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "fácil":
      return "text-green-500";
    case "médio":
      return "text-yellow-500";
    case "difícil":
      return "text-red-500";
    default:
      return "";
  }
}

export default function QuizzesPage() {
  const completedQuizzes = quizzes.filter((quiz) => quiz.completed).length;
  const totalQuizzes = quizzes.length;
  const progress = (completedQuizzes / totalQuizzes) * 100;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl">Seus Quizzes</h1>

          {/* Progress Overview */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso Geral</span>
                  <span>
                    {completedQuizzes} de {totalQuizzes} quizzes concluídos
                  </span>
                </div>
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por matéria" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem
                  key={subject.id}
                  value={subject.id.toString()}
                >
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quizzes Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                  <span>{quiz.subject}</span>
                  <span
                    className={cn(
                      "font-medium",
                      getDifficultyColor(quiz.difficulty),
                    )}
                  >
                    {quiz.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      {quiz.questions} questões
                    </span>
                    <span className="font-medium">
                      Nota: {quiz.score} / {quiz.maxScore}
                    </span>
                  </div>
                  <Progress
                    value={(quiz.score / quiz.maxScore) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Ver Respostas
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                >
                  Refazer Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
