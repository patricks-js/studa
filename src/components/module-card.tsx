import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  id: string;
  title: string;
  description: string;
};

export function ModuleCard({ id, title, description }: Props) {
  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <Icons.dots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Icons.edit className="size-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Icons.trash className="size-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="link"
          asChild
          className="px-0 text-muted-foreground hover:text-primary"
        >
          <Link href={`/modules/${id}`}>Ver matéria →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
