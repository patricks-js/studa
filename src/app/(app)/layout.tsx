import { AppSidebar } from "@/components/app-sidebart";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-4 sm:px-6 lg:px-8">
        <SidebarInset>
          <SidebarTrigger />
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
