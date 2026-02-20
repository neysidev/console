import { Sidebar } from "@/components/layouts/sidebar";
import { Breadcrumb } from "@/components/layouts/breadcrumb";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row">
      <div className="flex h-full shrink-0 flex-col overflow-hidden md:w-auto">
        <Sidebar />
      </div>
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-10 m-2 ml-0 shadow-lg rounded-xl border border-gray-200 bg-primary dark:border-gray-900 dark:bg-gray-900">
        <Breadcrumb />
        {children}
      </main>
    </div>
  );
}
