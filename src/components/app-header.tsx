"use client";

import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export function AppHeader() {
  const pathname = usePathname();

  const title = pathname
    .split("/")[1]
    .charAt(0)
    .toUpperCase()
    .concat(pathname.split("/")[1].substring(1));

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 p-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sm:px-6 lg:px-8">
      <div className="flex w-full items-center gap-1 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-medium text-base">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
        >
          <Icons.bell />
        </Button>
        <div>User</div>
      </div>
    </header>
  );
}
