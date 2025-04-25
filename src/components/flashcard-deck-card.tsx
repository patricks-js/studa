"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Icons } from "./icons";

type FlashcardDeckCardProps = {
  title: string;
  totalFlashcards: number;
  updatedAt: Date;
  isAI?: boolean;
};

export function FlashcardDeckCard({
  title,
  totalFlashcards,
  updatedAt,
  isAI = false,
}: FlashcardDeckCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Deck com {totalFlashcards} flashcard
          {totalFlashcards !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-xs">
          Atualizado há{" "}
          {formatDistanceToNow(updatedAt, { addSuffix: false, locale: ptBR })}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Matéria</Badge>
          {isAI && (
            <Badge variant="outline">
              <Icons.stars className="size-2 text-muted-foreground" />
              IA
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
        >
          Revisar
        </Button>
      </CardFooter>
    </Card>
  );
}
