import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { cache } from "react";
import { auth } from "./auth";

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
});
