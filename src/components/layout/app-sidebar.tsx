"use client";

import { ZapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NAVIGATION } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  function isActiveUrl(url: string) {
    return `/${pathname.split("/")[1]}` === url;
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="px-4 py-2">
            <a
              href="/home"
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="font-semibold text-lg">Studa.ai</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAVIGATION.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "[&>svg]:text-muted-foreground",
                      isActiveUrl(item.href) &&
                        "bg-sidebar-accent shadow-sm [&>svg]:text-sidebar-accent-foreground",
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Card className="gap-3">
          <CardHeader>
            <h3 className="font-semibold text-sm">Upgrade to Premium</h3>
            <p className="text-muted-foreground text-xs">
              Unlock all features by upgrading to the premium plan.
            </p>
          </CardHeader>
          <CardContent>
            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <Progress value={37} />
            </div>
            <p className="mt-1 text-muted-foreground text-xs">
              50% of free usage consumed
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <ZapIcon />
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
}
