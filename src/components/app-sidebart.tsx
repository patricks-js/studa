"use client";

import { ArrowUpCircleIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Icons.home,
    isActive: false,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Icons.settings,
    isActive: false,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  function isActiveUrl(url: string) {
    console.log(pathname, url);
    return pathname === url;
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="px-4 py-2">
            <a
              href="/dashboard"
              className="flex items-center gap-2"
            >
              <ArrowUpCircleIcon className="size-6" />
              <span className="font-semibold text-lg">Studa.ai</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "[&>svg]:text-muted-foreground",
                      isActiveUrl(item.url) &&
                        "bg-sidebar-accent shadow-sm [&>svg]:text-sidebar-accent-foreground",
                    )}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
