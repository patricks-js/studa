"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Icons } from "../icons";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";

export function ProfileDropdownLogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          toast("Redirecionando para login...", { duration: 2000 });
          router.push("/login");
        },
        onError(ctx) {
          toast.error("Operação falhou. Tente novamente mais tarde.");
          console.error(ctx.error.message);
        },
      },
    });
  }

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={handleSignOut}
    >
      <Icons.logout />
      Sair
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
