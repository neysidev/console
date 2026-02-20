"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/store-context";

export const ThemeSync = observer(function ThemeSync() {
  const { setTheme, resolvedTheme } = useTheme();
  const { uiStore } = useStores();

  useEffect(() => {
    setTheme(uiStore.theme);
  }, [uiStore.theme, setTheme]);

  useEffect(() => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      uiStore.setResolvedTheme(resolvedTheme);
    }
  }, [resolvedTheme, uiStore]);

  return null;
});
