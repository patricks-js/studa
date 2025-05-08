import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="space-y-2">
        <h4 className="text-center font-medium text-lg">Oh, no! 😢</h4>
        <p>O notebook que você está procurando não existe.</p>
      </div>
      <Button
        variant="link"
        asChild
      >
        <Link href="/notebooks">Voltar para a lista de notebooks</Link>
      </Button>
    </div>
  );
}
