"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/store-context";

export const ThemeSync = observer(function ThemeSync() {
  const { setTheme } = useTheme();
  const { uiStore } = useStores();

  useEffect(() => {
    setTheme(uiStore.theme);
  }, [uiStore.theme, setTheme]);

  return null;
});
