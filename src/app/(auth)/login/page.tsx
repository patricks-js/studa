import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <h3 className="text-center font-medium text-xl">
        👋 Bem-vindo ao StudyOS
      </h3>
      <div className="flex flex-col gap-2">
        <Button className="w-full">
          <Icons.google className="size-4" />
          Entrar com Google
        </Button>
        <Button className="w-full">
          <Icons.github className="size-4" />
          Entrar com GitHub
        </Button>
      </div>
    </div>
  );
}
