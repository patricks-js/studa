"use client";

import { ArrowUpCircleIcon, ZapIcon } from "lucide-react";

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
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";

const navItems = [
  {
    title: "Home",
    url: "/home",
    icon: Icons.home,
    isActive: false,
  },
  {
    title: "Matérias",
    url: "/subjects",
    icon: Icons.book,
    isActive: false,
  },
  {
    title: "Flashcards",
    url: "/flashcards",
    icon: Icons.flashcard,
    isActive: false,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: Icons.quiz,
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
              href="/home"
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
