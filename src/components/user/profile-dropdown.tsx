import Link from "next/link";

import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DROPDOWN_MENU_ITEMS } from "@/lib/constants";
import { verifySession } from "@/lib/server-utils";
import { UserAvatar } from "../user-avatar";
import { ProfileDropdownLogoutButton } from "./profile-dropdown-logout-button";

export async function ProfileDropdown() {
  const session = await verifySession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <UserAvatar user={session.user} />
        <Icons.chevronDown className="size-4 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-2 truncate">
            <UserAvatar user={session.user} />
            <div className="flex flex-col gap-1 truncate text-left">
              <span className="truncate font-medium text-sm leading-none">
                {session.user?.name || session.user?.email || "Usuário"}
              </span>

              {session.user?.name && session.user?.email && (
                <span
                  className={
                    "!font-light truncate text-muted-foreground text-xs leading-none"
                  }
                >
                  {session.user.email}
                </span>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {DROPDOWN_MENU_ITEMS.map(({ label, href, shortcut, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              asChild
            >
              <Link
                href={href}
                className="flex items-center gap-2"
              >
                <Icon />
                {label}
                <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ProfileDropdownLogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
