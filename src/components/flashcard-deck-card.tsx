"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Icons } from "./icons";

type FlashcardDeckCardProps = {
  moduleId: string;
  totalFlashcards: number;
  createdAt: Date;
  createdByAI?: boolean;
};

export function FlashcardDeckCard({
  moduleId,
  totalFlashcards,
  createdAt,
  createdByAI = false,
}: FlashcardDeckCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>
          Deck com {totalFlashcards} flashcard
          {totalFlashcards !== 1 ? "s" : ""}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-xs">
          Criado{" "}
          {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Matéria</Badge>
          {createdByAI && (
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
          asChild
          className="w-full"
        >
          <Link href={`/flashcard/${moduleId}`}>Revisar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
