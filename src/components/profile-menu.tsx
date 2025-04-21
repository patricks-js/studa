"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";
import { Icons } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { UserView } from "./user-view";

const menuItems = [
  {
    label: "Perfil",
    href: "/profile",
    icon: <Icons.user />,
    shortcut: "⇧⌘P",
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: <Icons.settings />,
    shortcut: "⌘S",
  },
  {
    label: "Assinatura",
    icon: <Icons.credit />,
    href: "/billing",
    shortcut: "⌘B",
  },
];

export function ProfileMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

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
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar
          user={user}
          isPending={isPending}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56"
      >
        <DropdownMenuLabel className="font-normal">
          <UserView
            user={user}
            isPending={isPending}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.label}
              asChild
            >
              <Link
                href={item.href}
                className="flex items-center gap-2"
              >
                {item.icon}
                {item.label}
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
        >
          <Icons.logout />
          Sair
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
