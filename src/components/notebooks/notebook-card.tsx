import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Notebook } from "@/lib/definitions";
import { NotebookStats, type NotebookStatsProps } from "./notebook-stats";

type Props = Pick<Notebook, "id" | "title" | "description" | "createdAt"> & {
  stats: NotebookStatsProps;
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

            <NotebookStats
              flashcards={stats.flashcards}
              quizzes={stats.quizzes}
              materials={stats.materials}
            />
          </CardContent>
        </Card>
      </Link>
    </TooltipProvider>
  );
}
