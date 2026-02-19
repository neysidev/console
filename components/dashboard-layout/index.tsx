"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)] md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
