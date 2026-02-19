"use client";

import { useState } from "react";
import { Switch } from "react-aria-components";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-primary p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function NotificationSwitch({
  label,
  description,
  isSelected,
  onChange,
}: {
  label: string;
  description?: string;
  isSelected: boolean;
  onChange: (selected: boolean) => void;
}) {
  return (
    <Switch
      isSelected={isSelected}
      onChange={onChange}
      className="group flex cursor-pointer items-start justify-between gap-4 outline-none data-focus-visible:rounded data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
    >
      <div className="min-w-0">
        <span className="text-sm font-medium text-primary">{label}</span>
        {description && (
          <p className="mt-0.5 text-xs text-tertiary">{description}</p>
        )}
      </div>
      <span
        className="relative inline-flex h-5 w-9 shrink-0 rounded-full border border-gray-300 bg-gray-100 transition-colors group-selected:border-black group-selected:bg-black"
        aria-hidden
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all ${
            isSelected ? "left-4" : "left-0.5"
          }`}
        />
      </span>
    </Switch>
  );
}

const NOTIFICATION_CATEGORIES = [
  {
    id: "orders",
    label: "Orders & shipments",
    hint: "Order confirmations and shipping updates",
  },
  {
    id: "billing",
    label: "Billing & invoices",
    hint: "Invoices and payment receipts",
  },
  {
    id: "security",
    label: "Security",
    hint: "Login attempts and password changes",
  },
  {
    id: "marketing",
    label: "Marketing",
    hint: "Promotions and product updates",
  },
  {
    id: "product",
    label: "Product updates",
    hint: "New features and improvements",
  },
] as const;

type CategoryId = (typeof NOTIFICATION_CATEGORIES)[number]["id"];

export function NotificationsTab() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(true);
  const [categories, setCategories] = useState<
    Record<CategoryId, { email: boolean; inApp: boolean }>
  >({
    orders: { email: true, inApp: true },
    billing: { email: true, inApp: false },
    security: { email: true, inApp: true },
    marketing: { email: false, inApp: false },
    product: { email: true, inApp: true },
  });

  const setCategory = (
    id: CategoryId,
    channel: "email" | "inApp",
    value: boolean
  ) => {
    setCategories((prev) => ({
      ...prev,
      [id]: { ...prev[id], [channel]: value },
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-primary">
              Email notifications
            </h3>
            <p className="text-xs text-tertiary">
              Receive notifications about your account and orders via email.
            </p>
            <NotificationSwitch
              label="Send me email notifications"
              description="Including order updates and security alerts"
              isSelected={emailEnabled}
              onChange={setEmailEnabled}
            />
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-primary">
              In-app notifications
            </h3>
            <p className="text-xs text-tertiary">
              Show notifications in the dashboard when you’re signed in.
            </p>
            <NotificationSwitch
              label="Show in-app notifications"
              description="Browser and dashboard notifications"
              isSelected={inAppEnabled}
              onChange={setInAppEnabled}
            />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">
            Notification preferences
          </h3>
          <p className="text-xs text-tertiary">
            Choose which notifications you want to receive and how.
          </p>
          <div className="divide-y divide-gray-200">
            {NOTIFICATION_CATEGORIES.map(({ id, label, hint }) => (
              <div
                key={id}
                className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary">{label}</p>
                  <p className="mt-0.5 text-xs text-tertiary">{hint}</p>
                </div>
                <div className="flex items-center gap-8">
                  <label className="flex cursor-pointer items-center gap-2">
                    <span className="text-xs text-tertiary">Email</span>
                    <Switch
                      isSelected={categories[id].email}
                      onChange={(v) => setCategory(id, "email", v)}
                      isDisabled={!emailEnabled}
                      className="group flex cursor-pointer outline-none disabled:cursor-not-allowed disabled:opacity-50 data-focus-visible:rounded data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
                    >
                      <span className="relative inline-flex h-5 w-9 shrink-0 rounded-full border border-gray-300 bg-gray-100 transition-colors group-selected:border-black group-selected:bg-black">
                        <span
                          className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all ${
                            categories[id].email ? "left-4" : "left-0.5"
                          }`}
                        />
                      </span>
                    </Switch>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <span className="text-xs text-tertiary">In-app</span>
                    <Switch
                      isSelected={categories[id].inApp}
                      onChange={(v) => setCategory(id, "inApp", v)}
                      isDisabled={!inAppEnabled}
                      className="group flex cursor-pointer outline-none disabled:cursor-not-allowed disabled:opacity-50 data-focus-visible:rounded data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
                    >
                      <span className="relative inline-flex h-5 w-9 shrink-0 rounded-full border border-gray-300 bg-gray-100 transition-colors group-selected:border-black group-selected:bg-black">
                        <span
                          className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all ${
                            categories[id].inApp ? "left-4" : "left-0.5"
                          }`}
                        />
                      </span>
                    </Switch>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
