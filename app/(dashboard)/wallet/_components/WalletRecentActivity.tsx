"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChevronRight } from "@untitledui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import type { Transfer, TransferStatus } from "@/data/mock-transfers";
import { MOCK_TRANSFERS } from "@/data/mock-transfers";

const STATUS_BADGE_COLOR: Record<
  TransferStatus,
  "error" | "brand" | "blue" | "gray" | "success" | "warning"
> = {
  Completed: "success",
  Pending: "warning",
  Processing: "blue",
  Failed: "error",
  Cancelled: "gray",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getWalletActivityDescription(t: Transfer): string {
  const isFromWallet = t.fromAccount.includes("Wallet");
  const isToWallet = t.toAccount.includes("Wallet");
  if (isFromWallet && isToWallet) return "Internal";
  if (isFromWallet) return `To ${t.toAccount}`;
  return `From ${t.fromAccount}`;
}

export function WalletRecentActivity() {
  const walletTransfers = useMemo(() => {
    return MOCK_TRANSFERS.filter(
      (t) => t.fromAccount.includes("Wallet") || t.toAccount.includes("Wallet")
    )
      .slice(0, 8)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-secondary">Recent activity</h2>
        <Link
          href="/transfers"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          View all
          <ChevronRight className="size-3.5" aria-hidden />
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-primary shadow-sm">
        {walletTransfers.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-tertiary">No recent activity</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {walletTransfers.map((t) => (
              <li key={t.id}>
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary">
                      {getWalletActivityDescription(t)}
                    </p>
                    <p className="text-xs text-tertiary">
                      {formatDate(t.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium tabular-nums text-primary">
                      {t.amount}
                    </span>
                    <BadgeWithDot
                      size="sm"
                      color={STATUS_BADGE_COLOR[t.status]}
                    >
                      {t.status}
                    </BadgeWithDot>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
