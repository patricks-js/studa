import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BookOpen, Folder, HelpCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  content?: string | null;
  createdAt: Date;
};

export function MaterialCard({ id, title, content, createdAt }: Props) {
  const formattedDate = format(createdAt, "dd 'de' MMMM, yyyy", {
    locale: ptBR,
  });

  return (
    <Card className="max-w-md gap-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {content && (
          <p className="line-clamp-3 text-muted-foreground text-sm">
            {content}
          </p>
        )}

        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Folder className="h-4 w-4" />
            <span>Adicionado em {formattedDate}</span>
          </div>

          <div className="flex gap-2 **:data-icon:size-3.5">
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-blue-50 py-1 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
            >
              <BookOpen data-icon />
              <span>3</span>
            </Badge>

            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-purple-50 py-1 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400"
            >
              <HelpCircle data-icon />
              <span>5</span>
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t bg-muted/10 md:gap-4">
        <Link
          href={`/content/${id}/flashcards`}
          className="flex-1"
        >
          <Button
            variant="outline"
            className="w-full"
          >
            <BookOpen />
            Estudar Agora (Flashcards)
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
