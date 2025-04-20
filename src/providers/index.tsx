import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
}
