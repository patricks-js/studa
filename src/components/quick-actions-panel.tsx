import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function QuickActionsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              Gerar conteúdo com IA
            </Button>
          </TooltipTrigger>
          <TooltipContent>Criar novo conteúdo usando IA</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              Ver todos os flashcards
            </Button>
          </TooltipTrigger>
          <TooltipContent>Acessar biblioteca de flashcards</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              Começar um Quiz
            </Button>
          </TooltipTrigger>
          <TooltipContent>Iniciar quiz de revisão</TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
