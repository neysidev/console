import { Sidebar } from "@/components/layouts/sidebar";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex flex-1 p-6 flex-col m-2 ml-0 min-w-0 shadow-lg rounded-xl border border-gray-200 bg-primary">
        {children}
      </main>
    </div>
  );
}
