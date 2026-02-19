"use client";

import { Button } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { Avatar } from "@/components/ui/Avatar";

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

const AVATAR_SRC = "https://www.untitledui.com/images/avatars/olivia-rhye";

export function ProfileTab() {
  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">
            Profile photo
          </h3>
          <p className="text-xs text-tertiary">
            This will be displayed on your profile and in comments.
          </p>
          <div className="flex items-center gap-4">
            <Avatar
              src={AVATAR_SRC}
              shape="circle"
              className="size-16 shrink-0"
            />
            <div className="flex flex-col gap-2">
              <Button className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
                Upload photo
              </Button>
              <p className="text-xs text-tertiary">
                JPG, GIF or PNG. Max size 2MB.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">
            Personal information
          </h3>
          <p className="text-xs text-tertiary">
            Update your name and email address.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="First name"
              placeholder="Olivia"
              defaultValue="Olivia"
            />
            <Input label="Last name" placeholder="Rhye" defaultValue="Rhye" />
            <Input
              label="Email"
              placeholder="olivia@example.com"
              defaultValue="olivia@example.com"
              type="email"
              className="sm:col-span-2"
            />
          </div>
          <Button className="mt-2 inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
            Save changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
