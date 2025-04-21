import type { User } from "better-auth";

import { Skeleton } from "./ui/skeleton";
import { UserAvatar } from "./user-avatar";

export interface UserViewProps {
  isPending?: boolean;
  user?: User;
}

export function UserView({ user, isPending }: UserViewProps) {
  return (
    <div className="flex items-center gap-2 truncate">
      <UserAvatar
        user={user}
        isPending={isPending}
      />
      <div className="flex flex-col gap-1 truncate text-left">
        {isPending ? (
          <div className="space-y-0.5">
            <Skeleton className="h-4 w-24 max-w-full" />
            <Skeleton className="h-3 w-32 max-w-full" />
          </div>
        ) : (
          <>
            <span className="truncate font-medium text-sm leading-none">
              {user?.name || user?.email || "Usuário"}
            </span>

            {user?.name && user?.email && (
              <span
                className={
                  "!font-light truncate text-muted-foreground text-xs leading-none"
                }
              >
                {user.email}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
