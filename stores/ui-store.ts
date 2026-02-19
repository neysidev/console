import { makeAutoObservable } from "mobx";
import type { Theme } from "@/types/theme";

export type { Theme } from "@/types/theme";

const THEME_STORAGE_KEY = "theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export class UIStore {
  theme: Theme = "light";
  sidebarOpen = true;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.theme = getStoredTheme();
    }
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  toggleTheme() {
    this.setTheme(this.theme === "light" ? "dark" : "light");
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setSidebarOpen(open: boolean) {
    this.sidebarOpen = open;
  }
}
