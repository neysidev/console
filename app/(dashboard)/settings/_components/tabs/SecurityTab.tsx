"use client";

import { useState } from "react";
import { Button } from "react-aria-components";
import { Switch } from "react-aria-components";
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

const ACTIVE_SESSIONS = [
  {
    id: "1",
    device: "Chrome on macOS",
    location: "New York, US",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "New York, US",
    lastActive: "2 hours ago",
    current: false,
  },
];

export function SecurityTab() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">
            Change password
          </h3>
          <p className="text-xs text-tertiary">
            Update your password to keep your account secure.
          </p>
          <div className="flex flex-col gap-4 max-w-sm">
            <Input
              label="Current password"
              placeholder="••••••••"
              type="password"
            />
            <Input
              label="New password"
              placeholder="••••••••"
              type="password"
            />
            <Input
              label="Confirm new password"
              placeholder="••••••••"
              type="password"
            />
            <Button className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
              Update password
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-primary">
                Two-factor authentication
              </h3>
              <p className="mt-1 text-xs text-tertiary">
                Add an extra layer of security by requiring a code when signing
                in.
              </p>
            </div>
            <Switch
              isSelected={twoFactorEnabled}
              onChange={setTwoFactorEnabled}
              className="group flex cursor-pointer shrink-0 outline-none data-focus-visible:rounded data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
            >
              <span
                className="relative inline-flex h-5 w-9 shrink-0 rounded-full border border-gray-300 bg-gray-100 transition-colors group-selected:border-black group-selected:bg-black"
                aria-hidden
              >
                <span
                  className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all ${
                    twoFactorEnabled ? "left-4" : "left-0.5"
                  }`}
                />
              </span>
            </Switch>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">
            Active sessions
          </h3>
          <p className="text-xs text-tertiary">
            Manage devices where you’re currently signed in.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[400px] text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-secondary">
                  <th className="px-3 py-2 font-medium text-primary">Device</th>
                  <th className="px-3 py-2 font-medium text-primary">
                    Location
                  </th>
                  <th className="px-3 py-2 font-medium text-primary">
                    Last active
                  </th>
                  <th className="w-20 px-3 py-2 font-medium text-primary"> </th>
                </tr>
              </thead>
              <tbody>
                {ACTIVE_SESSIONS.map((session) => (
                  <tr
                    key={session.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-secondary/50"
                  >
                    <td className="px-3 py-2 font-medium text-primary">
                      {session.device}
                    </td>
                    <td className="px-3 py-2 text-tertiary">
                      {session.location}
                    </td>
                    <td className="px-3 py-2 text-tertiary">
                      {session.lastActive}
                    </td>
                    <td className="px-3 py-2">
                      {session.current ? (
                        <span className="text-xs text-tertiary">Current</span>
                      ) : (
                        <Button className="cursor-pointer text-xs font-medium text-error-600 outline-none hover:underline data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
                          Revoke
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
