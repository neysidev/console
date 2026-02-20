"use client";

import { useState } from "react";
import {
  ButtonGroupRoot,
  ButtonGroupItem,
} from "@/components/ui/base/button-group";
import { AccountTab } from "./tabs/AccountTab";
import { AppearanceTab } from "./tabs/AppearanceTab";
import { ApiTab } from "./tabs/ApiTab";
import { BillingTab } from "./tabs/BillingTab";
import { IntegrationsTab } from "./tabs/IntegrationsTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { SecurityTab } from "./tabs/SecurityTab";

const TAB_ITEMS = [
  { id: "account", label: "Account" },
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
  { id: "integrations", label: "Integrations" },
  { id: "api", label: "API" },
] as const;

type TabId = (typeof TAB_ITEMS)[number]["id"];

const TAB_PANELS: Record<TabId, React.ReactNode> = {
  account: <AccountTab />,
  profile: <ProfileTab />,
  security: <SecurityTab />,
  billing: <BillingTab />,
  notifications: <NotificationsTab />,
  appearance: <AppearanceTab />,
  integrations: <IntegrationsTab />,
  api: <ApiTab />,
};

export function SettingsTabs() {
  const [selectedTab, setSelectedTab] = useState<TabId>("account");

  return (
    <div className="flex flex-col gap-8">
      <ButtonGroupRoot
        aria-label="Settings sections"
        selectedKeys={new Set([selectedTab])}
        className="w-max dark:bg-gray-900 dark:text-gray-500 dark:border-gray-800"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];
          if (key != null) setSelectedTab(key as TabId);
        }}
      >
        {TAB_ITEMS.map((item) => (
          <ButtonGroupItem
            key={item.id}
            id={item.id}
            className="dark:bg-gray-900 dark:text-gray-500 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            {item.label}
          </ButtonGroupItem>
        ))}
      </ButtonGroupRoot>

      <div className="outline-none">{TAB_PANELS[selectedTab]}</div>
    </div>
  );
}
