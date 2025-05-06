import type { ElementType } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import type { OAuthProvider } from "./login-form";

const PROVIDERS: {
  id: OAuthProvider;
  label: string;
  icon: ElementType;
}[] = [
  { id: "google", label: "Google", icon: Icons.google },
  { id: "github", label: "GitHub", icon: Icons.github },
];

type Props = {
  isLoadingProvider: OAuthProvider | null;
  setIsLoadingProvider: (provider: OAuthProvider | null) => void;
  isAuthPending: boolean;
  setIsAuthPending: (value: boolean) => void;
};

export function SocialLoginButtons({
  isLoadingProvider,
  setIsLoadingProvider,
  isAuthPending,
  setIsAuthPending,
}: Props) {
  async function handleSocialLogin(provider: OAuthProvider) {
    setIsLoadingProvider(provider);

    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/home",
      },
      {
        onSuccess() {
          toast.success("Login com sucesso!");
          setIsAuthPending(true);
        },
        onError() {
          toast.error("Erro ao fazer login. Tente novamente.");
        },
      },
    );

    setIsLoadingProvider(null);
  }

  const isDisabled = isAuthPending || isLoadingProvider !== null;

  return (
    <div className="flex items-center gap-2">
      {PROVIDERS.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant="outline"
          onClick={() => handleSocialLogin(id)}
          disabled={isDisabled}
          className="flex-1"
        >
          {isLoadingProvider === id ? (
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
