"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const signIn = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onSuccess: () => {
          toast.success("Login realizado com sucesso!");
          router.push("/");
        },
        onError: (error) => {
          toast.error("Erro ao realizar login");
          console.error(error);
        },
      },
    );
  };

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
        <Button
          onClick={() => signIn()}
          className="w-full"
        >
          <Icons.github className="size-4" />
          Entrar com GitHub
        </Button>
      </div>
    </div>
  );
}
