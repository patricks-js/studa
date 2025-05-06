"use client";

import { useState } from "react";

import { SocialLoginButtons } from "./social-login-buttons";

export type OAuthProvider = "google" | "github";

export function LoginForm() {
  const [isLoadingProvider, setIsLoadingProvider] =
    useState<OAuthProvider | null>(null);
  const [isAuthPending, setIsAuthPending] = useState(false);

  return (
    <SocialLoginButtons
      isLoadingProvider={isLoadingProvider}
      setIsLoadingProvider={setIsLoadingProvider}
      isAuthPending={isAuthPending}
      setIsAuthPending={setIsAuthPending}
    />
  );
}
