"use client";

import Link from "next/link";
import type { BreadcrumbSegmentItem } from "@/types/breadcrumb";

type BreadcrumbSegmentProps = BreadcrumbSegmentItem;

export function BreadcrumbSegment({
  href,
  label,
  isCurrent,
}: BreadcrumbSegmentProps) {
  if (isCurrent) {
    return (
      <span className="font-medium dark:text-gray-500" aria-current="page">
        {label}
      </span>
    );
  }

  return (
    <>
      <Link
        href={href}
        className="rounded-md px-1 py-0.5 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-white"
      >
        {label}
      </Link>
      <span
        aria-hidden
        className="select-none text-gray-400 dark:text-gray-600"
      >
        /
      </span>
    </>
  );
}
