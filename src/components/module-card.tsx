import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  id: string;
  title: string;
  description: string;
};

export function ModuleCard({ id, title, description }: Props) {
  return (
    <Card
      key={id}
      className="transition-colors hover:bg-muted/50"
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <a
          href={`/modules/${id}`}
          className="text-muted-foreground text-sm hover:text-primary"
        >
          Ver matéria →
        </a>
      </CardFooter>
    </Card>
  );
}
