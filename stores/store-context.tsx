"use client";

import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { UIStore } from "./ui-store";

type StoreContextValue = {
  uiStore: UIStore;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const uiStore = new UIStore();

export function StoreProvider({ children }: PropsWithChildren) {
  const value = useMemo(() => ({ uiStore }), []);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStores(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStores must be used within StoreProvider");
  return ctx;
}
