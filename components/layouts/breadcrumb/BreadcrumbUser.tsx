"use client";

import Link from "next/link";
import { User01 } from "@untitledui/icons";
import { Avatar } from "@/components/ui/Avatar";

type BreadcrumbUserProps = {
  username: string;
  avatar?: string | null;
};

export function BreadcrumbUser({ username, avatar }: BreadcrumbUserProps) {
  return (
    <Link
      href="/my-account"
      className="flex items-center gap-2 rounded-md px-1 py-0.5 transition-colors hover:bg-gray-50 hover:text-primary"
    >
      <Avatar src={avatar} shape="rounded">
        <User01 className="size-3.5" />
      </Avatar>
      <span className="font-medium">{username}</span>
    </Link>
  );
}
