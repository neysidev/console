"use client";

import { Button, Link } from "react-aria-components";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ArrowRight } from "@untitledui/icons";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-primary p-6 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
}

const INTEGRATIONS = [
  {
    id: "slack",
    name: "Slack",
    description: "Send notifications and sync with your Slack workspace.",
    connected: true,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Connect repositories and manage deployments.",
    connected: false,
  },
  {
    id: "google",
    name: "Google Workspace",
    description: "Sign in with Google and sync calendar and contacts.",
    connected: false,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Import docs and sync pages with your workspace.",
    connected: false,
  },
];

export function IntegrationsTab() {
  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary dark:text-white">
            Connected apps
          </h3>
          <p className="text-xs text-tertiary">
            Manage third-party apps and services linked to your account.
          </p>
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
            {INTEGRATIONS.map((app) => (
              <div
                key={app.id}
                className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-primary dark:text-white">
                      {app.name}
                    </p>
                    {app.connected && (
                      <BadgeWithDot type="pill-color" color="success" size="sm">
                        Connected
                      </BadgeWithDot>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-tertiary dark:text-gray-500">
                    {app.description}
                  </p>
                </div>
                {app.connected ? (
                  <Button className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
                    Manage
                  </Button>
                ) : (
                  <Button className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-black bg-black px-3 py-1.5 text-xs font-medium text-white outline-none transition-colors hover:bg-gray-800 data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-primary">
            Developer integrations
          </h3>
          <p className="text-xs text-tertiary">
            Use our API or webhooks to build custom integrations.
          </p>
          <Link
            href="#"
            className="inline-flex w-fit items-center gap-1 text-xs font-medium text-primary outline-none hover:underline data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
          >
            View API documentation
            <ArrowRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </div>
      </Card>
    </div>
  );
}
