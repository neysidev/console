import { makeAutoObservable } from "mobx";
import type { Theme } from "@/types/theme";

export type { Theme } from "@/types/theme";

const THEME_STORAGE_KEY = "theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system")
    return stored;
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
    if (this.theme === "light") this.setTheme("dark");
    else if (this.theme === "dark") this.setTheme("light");
    else this.setTheme(this.resolvedTheme === "light" ? "dark" : "light");
  }

  /** Resolved theme for display (light/dark); when theme is "system", this reflects OS preference. */
  resolvedTheme: "light" | "dark" = "light";

  setResolvedTheme(resolved: "light" | "dark") {
    this.resolvedTheme = resolved;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setSidebarOpen(open: boolean) {
    this.sidebarOpen = open;
  }
}
