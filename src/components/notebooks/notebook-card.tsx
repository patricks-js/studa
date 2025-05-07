import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Notebook } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, HelpCircle } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = Pick<Notebook, "id" | "title" | "description" | "createdAt"> & {
  stats: {
    flashcards: number;
    quizzes: number;
    materials: number;
  };
};

export function NotebookCard({ id, title, description, stats }: Props) {
  return (
    <TooltipProvider>
      <Link
        href={`/notebooks/${id}`}
        passHref
        className="block no-underline"
      >
        <Card className="h-full cursor-pointer gap-4">
          <CardHeader>
            <CardTitle className="line-clamp-2">{title}</CardTitle>
          </CardHeader>

          <CardContent className="flex-1">
            {description && (
              <p className="mb-4 line-clamp-3 text-muted-foreground transition-all duration-300">
                {description}
              </p>
            )}

            {/* Indicadores de conteúdo */}
            <div className="mt-auto flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1 py-1 transition-all",
                      stats.flashcards > 0
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/50"
                        : "bg-muted/50",
                    )}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{stats.flashcards}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{stats.flashcards} flashcards</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1 py-1 transition-all",
                      stats.quizzes > 0
                        ? "bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:hover:bg-purple-950/50"
                        : "bg-muted/50",
                    )}
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>{stats.quizzes}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{stats.quizzes} quizzes</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1 py-1 transition-all",
                      stats.materials > 0
                        ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:hover:bg-amber-950/50"
                        : "bg-muted/50",
                    )}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>{stats.materials}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{stats.materials} materiais</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </Link>
    </TooltipProvider>
  );
}
