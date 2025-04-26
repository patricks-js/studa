import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResourceCardProps {
  title: string;
  content?: string | null;
  createdAt: Date;
}

export function ResourceCard({ title, content, createdAt }: ResourceCardProps) {
  const preview =
    content && content.length > 150
      ? content.slice(0, 150).concat("...")
      : content;

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>

      <CardContent className="whitespace-pre-line text-muted-foreground text-sm">
        {preview}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Adicionado{" "}
          {formatDistanceToNow(createdAt, {
            addSuffix: true,
            locale: ptBR,
          })}
        </span>
      </CardFooter>
    </Card>
  );
}
