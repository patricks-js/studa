import { getModuleByIdAction } from "@/actions/actions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Params = {
  params: Promise<{
    moduleId: string;
  }>;
};

export default async function ModulePage({ params }: Params) {
  const { moduleId } = await params;

  const m = await getModuleByIdAction(moduleId);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-bold text-2xl">{m.title}</h1>
        <p className="text-muted-foreground text-sm">
          Criado{" "}
          {formatDistanceToNow(new Date(m.createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
      </header>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg tracking-tight">Recursos</h2>
          <Button>
            <Icons.add />
            Adicionar recurso
          </Button>
        </div>
        <Separator />
      </section>
      <section className="space-y-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-medium text-lg tracking-tight">Flashcards</h2>
          <HoverBorderGradient
            containerClassName="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 rounded-md font-medium text-sm"
            as="button"
            className="flex items-center gap-2 bg-white text-black dark:bg-black dark:text-white"
          >
            <Icons.stars />
            Gerar flashcards
          </HoverBorderGradient>
        </div>
        <Separator />
      </section>
    </div>
  );
}
