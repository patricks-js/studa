import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

type Props = {
  progress: number;
  totalTopics: number;
  totalFlashcards: number;
  totalQuizzes: number;
  studyTime: string;
  lastAccess: string;
};

export function SubjectProgressPanel(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso da Matéria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div>
          <div className="mb-2 flex justify-between">
            <span className="font-medium text-base text-muted-foreground">
              Progresso geral
            </span>
            <span className="font-medium">{props.progress}%</span>
          </div>
          <Progress value={props.progress} />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total de tópicos</span>
            <span>{props.totalTopics}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Flashcards criados</span>
            <span>{props.totalFlashcards}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quizzes realizados</span>
            <span>{props.totalQuizzes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tempo de estudo</span>
            <span>{props.studyTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Último acesso</span>
            <span>{new Date(props.lastAccess).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
