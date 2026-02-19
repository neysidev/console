"use client";

import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/store-context";
import { Menu01, Sun, Moon01 } from "@untitledui/icons";

export const Header = observer(function Header() {
  const { uiStore } = useStores();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--color-border-secondary)] px-4">
      <button
        type="button"
        onClick={() => uiStore.toggleSidebar()}
        className="rounded p-1.5 text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-primary)] md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu01 className="size-5" />
      </button>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={() => uiStore.toggleTheme()}
          className="rounded-lg p-2 text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-primary)]"
          aria-label={
            uiStore.theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          {uiStore.theme === "light" ? (
            <Moon01 className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </button>
      </div>
    </header>
  );
});
