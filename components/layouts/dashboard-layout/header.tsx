"use client";

import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/store-context";
import { Menu01, Sun, Moon01 } from "@untitledui/icons";

export const Header = observer(function Header() {
  const { uiStore } = useStores();
  const isDark = uiStore.resolvedTheme === "dark";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-secondary px-4">
      <button
        type="button"
        onClick={() => uiStore.toggleSidebar()}
        className="rounded p-1.5 text-fg-secondary hover:bg-bg-secondary hover:text-fg-primary md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu01 className="size-5" />
      </button>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={() => uiStore.toggleTheme()}
          className="rounded-lg p-2 text-(--color-fg-secondary) hover:bg-(--color-bg-secondary) hover:text-(--color-fg-primary)"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="size-5" /> : <Moon01 className="size-5" />}
        </button>
      </div>
    </header>
  );
});
