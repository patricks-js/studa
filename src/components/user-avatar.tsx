import { cn } from "@/lib/utils";
import type { User } from "better-auth";
import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  user?: User;
};

export function UserAvatar({ user }: UserAvatarProps) {
  const name = user?.name || user?.email;
  const url = user?.image;

  return (
    <Avatar className={cn("bg-accent", !user && "animate-pulse")}>
      <AvatarImage
        src={url || undefined}
        alt={`${name || "User"}'s avatar`}
        width={32}
        height={32}
      />
      <AvatarFallback
        className="uppercase"
        delayMs={url ? 600 : undefined}
      >
        {name?.charAt(0).toUpperCase() || <Icons.user className="size-1/2" />}
      </AvatarFallback>
    </Avatar>
  );
}
