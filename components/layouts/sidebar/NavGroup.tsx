"use client";

import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";
import type { NavGroup as NavGroupType } from "@/types/navigation";

type NavGroupProps = {
  items: NavGroupType;
};

export function NavGroup({ items }: NavGroupProps) {
  const pathname = usePathname();

  return (
    <>
      {items.map(({ href, label, icon }) => (
        <NavLink
          key={href}
          href={href}
          label={label}
          icon={icon}
          isActive={pathname === href}
        />
      ))}
    </>
  );
}
