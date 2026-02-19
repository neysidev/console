"use client";

import { Button } from "react-aria-components";
import { Input } from "@/components/base/input/input";

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

export function AccountTab() {
  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">Organization</h3>
          <p className="text-xs text-tertiary">
            Your organization name and contact details.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Organization name"
              placeholder="Acme Inc."
              defaultValue="Acme Inc."
            />
            <Input
              label="Billing email"
              placeholder="billing@acme.com"
              defaultValue="billing@acme.com"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">Preferences</h3>
          <p className="text-xs text-tertiary">
            Default timezone and language for your account.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-primary">
                Timezone
              </label>
              <select
                className="rounded-lg border border-gray-300 bg-primary px-3 py-2 text-sm text-primary outline-none transition-colors focus:ring-2 focus:ring-primary"
                defaultValue="America/New_York"
                aria-label="Timezone"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-primary">
                Language
              </label>
              <select
                className="rounded-lg border border-gray-300 bg-primary px-3 py-2 text-sm text-primary outline-none transition-colors focus:ring-2 focus:ring-primary"
                defaultValue="en"
                aria-label="Language"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-utility-error-200">
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-utility-error-700">
            Danger zone
          </h3>
          <p className="text-xs text-tertiary">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-utility-error-200 bg-utility-error-50 px-3 py-1.5 text-xs font-medium text-utility-error-700 outline-none transition-colors hover:bg-utility-error-100 data-focus-visible:ring-2 data-focus-visible:ring-error-500 data-focus-visible:ring-offset-2">
            Delete account
          </Button>
        </div>
      </Card>
    </div>
  );
}
