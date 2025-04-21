import type { User } from "better-auth";
import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type UserAvatarProps = {
  user?: User;
  isPending?: boolean;
};

export function UserAvatar({ user, isPending }: UserAvatarProps) {
  const name = user?.name || user?.email;
  const url = user?.image;

  if (isPending) {
    return <Skeleton className="size-8 shrink-0 rounded-full" />;
  }

  return (
    <Avatar className="bg-muted">
      <AvatarImage
        src={url || undefined}
        alt={`${name || "User"}'s avatar`}
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
