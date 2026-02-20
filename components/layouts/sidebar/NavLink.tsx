"use client";

import Link from "next/link";
import { cx } from "@/utils/cx";
import type { NavItem } from "@/types/navigation";

type NavLinkProps = NavItem & {
  isActive: boolean;
  indent?: boolean;
};

export function NavLink({
  href,
  label,
  icon: Icon = null,
  isActive,
  indent = false,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "flex items-center gap-3 rounded-lg px-3 select-none py-2 text-xs font-medium transition-colors duration-100 ease-out",
        indent && "ml-7",
        isActive
          ? "bg-gray-200 text-black dark:text-white dark:bg-gray-900"
          : "text-gray-500 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-900 dark:hover:text-white"
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {label}
    </Link>
  );
}
