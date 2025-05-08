import type { PropsWithChildren } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <SidebarInset>
          <AppHeader />
          <div className="mx-auto w-full max-w-[1440px] flex-1 p-4 md:px-6 lg:px-8">
            {children}
          </div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
