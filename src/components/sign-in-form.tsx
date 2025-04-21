"use client";

import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Icons } from "./icons";
import { Button } from "./ui/button";

type OAuthProviders = "google" | "github";

export function SignInForm() {
  async function handleSocialSignIn(provider: OAuthProviders) {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/home",
      },
      {
        onSuccess() {
          toast.success("Redirecionando...");
        },
        onError(ctx) {
          toast.error("Erro ao fazer login. Tente novamente.");
          console.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => handleSocialSignIn("google")}
        className="flex-1"
      >
        <Icons.google className="size-4" />
        Google
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialSignIn("github")}
        className="flex-1"
      >
        <Icons.github className="size-4" />
        GitHub
      </Button>
    </div>
  );
}
