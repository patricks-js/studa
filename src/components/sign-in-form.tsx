"use client";

import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Icons } from "./icons";
import { Button } from "./ui/button";

type OAuthProvider = "google" | "github";

const PROVIDERS: {
  id: OAuthProvider;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "google", label: "Google", icon: Icons.google },
  { id: "github", label: "GitHub", icon: Icons.github },
];

export function SignInForm() {
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(
    null,
  );

  async function handleSocialSignIn(provider: OAuthProvider) {
    setLoadingProvider(provider);

    try {
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
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {PROVIDERS.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant="outline"
          onClick={() => handleSocialSignIn(id)}
          disabled={loadingProvider !== null}
          className="flex-1"
        >
          {loadingProvider === id ? (
            <Icons.loader className="size-4 animate-spin" />
          ) : (
            <>
              <Icon className="size-4" />
              {label}
            </>
          )}
        </Button>
      ))}
    </div>
  );
}
