"use client";

import { usePathname } from "next/navigation";
import { pathToLabel, formatSegment } from "@/utils/pathToLabel";
import { BreadcrumbSeparator } from "./BreadcrumbSeparator";
import { BreadcrumbSegment } from "./BreadcrumbSegment";
import type { BreadcrumbSegmentItem } from "@/types/breadcrumb";

function buildSegmentItems(pathname: string): BreadcrumbSegmentItem[] {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = pathToLabel.get(href) ?? formatSegment(segment);
    const isCurrent = i === segments.length - 1;
    return { href, label, isCurrent };
  });
}

export function BreadcrumbSegments() {
  const pathname = usePathname();
  const items = buildSegmentItems(pathname);

  if (items.length === 0) return null;

  return (
    <>
      <BreadcrumbSeparator />
      {items.map((item) => (
        <span key={item.href} className="flex items-center gap-1.5">
          <BreadcrumbSegment
            href={item.href}
            label={item.label}
            isCurrent={item.isCurrent}
          />
        </span>
      ))}
    </>
  );
}
