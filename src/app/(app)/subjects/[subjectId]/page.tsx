"use client";

import { QuickActionsPanel } from "@/components/quick-actions-panel";
import { SubjectProgressPanel } from "@/components/subject-progress-panel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data (replace with real data later)
const subject = {
  id: "math-101",
  name: "Matemática - Álgebra Linear",
  progress: 65,
  totalTopics: 12,
  totalFlashcards: 148,
  totalQuizzes: 8,
  studyTime: "24h 30min",
  lastAccess: "2024-04-19T15:30:00",
  topics: [
    {
      id: 1,
      title: "Matrizes e Determinantes",
      description:
        "Operações com matrizes, propriedades e cálculo de determinantes.",
      flashcards: 24,
      progress: 75,
      quizzes: 3,
    },
    {
      id: 2,
      title: "Sistemas Lineares",
      description:
        "Resolução de sistemas lineares, método de Gauss e aplicações.",
      flashcards: 18,
      progress: 45,
      quizzes: 2,
    },
    // Add more topics as needed
  ],
};

export default function SubjectPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Content Column */}
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl">{subject.name}</h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>+ Novo Tópico</Button>
              </TooltipTrigger>
              <TooltipContent>Adicionar novo tópico de estudo</TooltipContent>
            </Tooltip>
          </div>

          {/* Topics Grid */}
          <div className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
            {subject.topics.map((topic) => (
              <Card key={topic.id}>
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-4 text-muted-foreground">
                        <span>{topic.flashcards} flashcards</span>
                        <span>{topic.quizzes} quizzes</span>
                      </div>
                      <span>{topic.progress}% concluído</span>
                    </div>
                    <Progress value={topic.progress} />
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Ver conteúdo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Gerar Flashcards
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>

        <aside className="w-full space-y-6 lg:w-[30%]">
          <SubjectProgressPanel {...subject} />
          <QuickActionsPanel />
        </aside>
      </div>
    </div>
  );
}
