"use client";

import { TrendUp01 } from "@untitledui/icons";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { Transfer } from "@/data/mock-transfers";
import { getTransferStats } from "@/data/mock-transfers";

type TransfersStatsProps = {
  transfers: Transfer[];
};

const statCardClass =
  "rounded-xl border border-gray-200 bg-primary p-5 shadow-xs transition-shadow hover:shadow-sm";

export function TransfersStats({ transfers }: TransfersStatsProps) {
  const stats = getTransferStats(transfers);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Sent this month
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <AnimatedNumber
            value={stats.sentThisMonth}
            format="currency"
            currency="USD"
            className="text-xl font-semibold text-primary"
          />
          <BadgeWithIcon
            size="sm"
            type="color"
            color="success"
            iconLeading={TrendUp01}
          >
            <span className="inline">
              +
              <AnimatedNumber
                value={stats.sentChangeValue / 100}
                format="percent"
                className="inline"
              />
            </span>
          </BadgeWithIcon>
        </div>
        <p className="mt-1 text-xs text-tertiary">vs last month</p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Total sent
        </p>
        <AnimatedNumber
          value={stats.totalSent}
          format="currency"
          currency="USD"
          className="mt-3 block text-xl font-semibold text-primary"
        />
        <p className="mt-1 text-xs text-tertiary">All completed transfers</p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Pending
        </p>
        <AnimatedNumber
          value={stats.pendingCount}
          format="integer"
          className="mt-3 block text-xl font-semibold text-primary"
        />
        <p className="mt-1 text-xs text-tertiary">Awaiting completion</p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Transfers
        </p>
        <AnimatedNumber
          value={stats.totalTransfers}
          format="integer"
          className="mt-3 block text-xl font-semibold text-primary"
        />
        <p className="mt-1 text-xs text-tertiary">
          {stats.completedCount} completed, {stats.failedCount} failed
        </p>
      </div>
    </section>
  );
}
