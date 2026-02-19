"use client";

import Link from "next/link";
import { Plus, ArrowUpRight, ArrowDownLeft } from "@untitledui/icons";

const actionClass =
  "inline-flex flex-1 min-w-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-primary px-4 py-3 text-sm font-medium text-primary shadow-xs outline-none transition-colors hover:bg-secondary hover:border-gray-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function WalletQuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Link href="/transfers" className={actionClass} aria-label="Add money">
        <Plus className="size-5 shrink-0" aria-hidden />
        Add money
      </Link>
      <Link href="/transfers" className={actionClass} aria-label="Send money">
        <ArrowUpRight className="size-5 shrink-0" aria-hidden />
        Send
      </Link>
      <Link
        href="/transfers"
        className={actionClass}
        aria-label="Request money"
      >
        <ArrowDownLeft className="size-5 shrink-0" aria-hidden />
        Request
      </Link>
    </div>
  );
}
