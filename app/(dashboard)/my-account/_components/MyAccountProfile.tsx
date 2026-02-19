"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronRight } from "@untitledui/icons";

const AVATAR_SRC = "https://www.untitledui.com/images/avatars/olivia-rhye";

const linkButtonClass =
  "inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function MyAccountProfile() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-primary p-6 shadow-sm">
        <h2 className="text-base font-semibold text-primary">Profile</h2>
        <p className="mt-1 text-sm text-tertiary">
          Your personal information and profile photo.
        </p>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={AVATAR_SRC}
              shape="circle"
              className="size-16 shrink-0"
            />
            <div>
              <p className="font-medium text-primary">Olivia Rhye</p>
              <p className="text-sm text-tertiary">olivia@example.com</p>
            </div>
          </div>
          <Link href="/settings" className={linkButtonClass}>
            Edit profile
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-primary p-6 shadow-sm">
        <h2 className="text-base font-semibold text-primary">Quick links</h2>
        <p className="mt-1 text-sm text-tertiary">
          Manage your plan, billing, and preferences.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/settings" className={linkButtonClass}>
            Settings
            <ChevronRight className="size-4" aria-hidden />
          </Link>
          <Link href="/plans-billing" className={linkButtonClass}>
            Plans & billing
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
