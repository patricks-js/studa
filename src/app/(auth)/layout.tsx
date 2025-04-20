import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}
