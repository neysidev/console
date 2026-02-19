"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/store-context";
import { Home01, Receipt, Menu01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home01 },
  { href: "/orders", label: "Orders", icon: Receipt },
];

export const Sidebar = observer(function Sidebar() {
  const pathname = usePathname();
  const { uiStore } = useStores();

  if (!uiStore.sidebarOpen) return null;

  return (
    <aside
      className="flex w-64 flex-col border-r border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]"
      aria-label="Sidebar"
    >
      <div className="flex h-14 items-center gap-2 border-b border-[var(--color-border-secondary)] px-4">
        <button
          type="button"
          onClick={() => uiStore.toggleSidebar()}
          className="rounded p-1.5 text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-primary)]"
          aria-label="Toggle sidebar"
        >
          <Menu01 className="size-5" />
        </button>
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Console
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--color-bg-brand-primary)] text-[var(--color-text-brand-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
});
