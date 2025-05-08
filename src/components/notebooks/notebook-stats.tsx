import { BookOpen, FileText, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type NotebookStatsProps = {
  flashcards: number;
  quizzes: number;
  materials: number;
};

export function NotebookStats({
  flashcards,
  quizzes,
  materials,
}: NotebookStatsProps) {
  return (
    <div className="mt-auto flex flex-wrap gap-2">
      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-1 py-1 transition-all",
          flashcards > 0
            ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/50"
            : "bg-muted/50",
        )}
      >
        <BookOpen className="h-3.5 w-3.5" />
        <span>{flashcards}</span>
      </Badge>

      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-1 py-1 transition-all",
          quizzes > 0
            ? "bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:hover:bg-purple-950/50"
            : "bg-muted/50",
        )}
      >
        <HelpCircle className="h-3.5 w-3.5" />
        <span>{quizzes}</span>
      </Badge>

      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-1 py-1 transition-all",
          materials > 0
            ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:hover:bg-amber-950/50"
            : "bg-muted/50",
        )}
      >
        <FileText className="h-3.5 w-3.5" />
        <span>{materials}</span>
      </Badge>
    </div>
  );
}
