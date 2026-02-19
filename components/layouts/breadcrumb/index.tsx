"use client";

import {
  DEFAULT_BREADCRUMB_USERNAME,
  DEFAULT_BREADCRUMB_AVATAR,
} from "@/constants/breadcrumb";
import type { BreadcrumbProps } from "@/types/breadcrumb";
import { BreadcrumbUser } from "./BreadcrumbUser";
import { BreadcrumbSegments } from "./BreadcrumbSegments";

export type { BreadcrumbProps } from "@/types/breadcrumb";

export function Breadcrumb({
  username = DEFAULT_BREADCRUMB_USERNAME,
  avatar = DEFAULT_BREADCRUMB_AVATAR,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-gray-700"
    >
      <BreadcrumbUser username={username} avatar={avatar} />
      <BreadcrumbSegments />
    </nav>
  );
}
