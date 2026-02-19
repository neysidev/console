"use client";

import { ChevronRight } from "@untitledui/icons";

export function BreadcrumbSeparator() {
  return (
    <span aria-hidden className="select-none">
      <ChevronRight className="size-3.5 text-gray-400" />
    </span>
  );
}
