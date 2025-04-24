import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModuleCardActions } from "./module-card-actions";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  id: string;
  title: string;
  description: string | null;
};

export function ModuleCard({ id, title, description }: Props) {
  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader>
        <ModuleCardActions moduleId={id} />
        <CardTitle>{title}</CardTitle>
        <CardDescription
          className={cn("line-clamp-1", !description && "hidden")}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-baseline gap-1">
        <p className="text-muted-foreground text-sm">Mar 27, 2025</p>
        <span className="text-muted-foreground text-sm">•</span>
        <p className="text-muted-foreground text-sm">23 recursos</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          asChild
          className="px-0 text-muted-foreground hover:text-primary"
        >
          <Link href={`/modules/${id}`}>Ver módulo →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
