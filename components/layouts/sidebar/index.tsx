"use client";

import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/store-context";
import { Divider } from "./Divider";
import { NavGroup } from "./NavGroup";
import { NavSection } from "./NavSection";
import { SidebarLogo } from "./SidebarLogo";
import {
  mainNavItems,
  bankAccountsSection,
  walletNavItems,
  accountNavItems,
  bottomNavItems,
} from "@/constants/navigation";

export const Sidebar = observer(function Sidebar() {
  const { uiStore } = useStores();

  if (!uiStore.sidebarOpen) return null;

  return (
    <aside className="flex w-64 flex-col px-2 py-6" aria-label="Sidebar">
      <SidebarLogo />

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        <NavGroup items={mainNavItems} />
        <Divider />

        <NavSection section={bankAccountsSection} />
        <NavGroup items={walletNavItems} />
        <Divider />

        <NavGroup items={accountNavItems} />

        <div className="mt-auto flex flex-col gap-0.5 pt-2">
          <NavGroup items={bottomNavItems} />
        </div>
      </nav>
    </aside>
  );
});
