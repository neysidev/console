"use client";

import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";
import type { NavSectionConfig } from "@/types/navigation";

type NavSectionProps = {
  section: NavSectionConfig;
};

export function NavSection({ section }: NavSectionProps) {
  const pathname = usePathname();
  const { title, icon: Icon, children } = section;

  return (
    <>
      <div className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-gray-500">
        {Icon && <Icon className="size-4 shrink-0" />}
        {title}
      </div>
      {children.map(({ href, label, icon }) => (
        <NavLink
          key={href}
          href={href}
          label={label}
          icon={icon}
          isActive={pathname === href}
          indent
        />
      ))}
    </>
  );
}
