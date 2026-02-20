"use client";

import { TrendUp01 } from "@untitledui/icons";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { Order } from "@/data/mock-orders";
import { getOrderStats } from "@/data/mock-orders";

type OrdersStatsProps = {
  orders: Order[];
};

const statCardClass =
  "rounded-xl border border-gray-200 bg-primary p-5 shadow-xs transition-shadow hover:shadow-sm";

export function OrdersStats({ orders }: OrdersStatsProps) {
  const stats = getOrderStats(orders);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary dark:text-gray-500">
          Total revenue
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <AnimatedNumber
            value={stats.totalRevenue}
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
                value={stats.revenueChangeValue / 100}
                format="percent"
                className="inline"
              />
            </span>
          </BadgeWithIcon>
        </div>
        <p className="mt-1 text-xs text-tertiary">vs last period</p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Orders
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <AnimatedNumber
            value={stats.totalOrders}
            format="integer"
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
                value={stats.ordersChangeValue / 100}
                format="percent"
                className="inline"
              />
            </span>
          </BadgeWithIcon>
        </div>
        <p className="mt-1 text-xs text-tertiary">vs last period</p>
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
        <p className="mt-1 text-xs text-tertiary">
          Awaiting fulfillment or payment
        </p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Avg. order value
        </p>
        <AnimatedNumber
          value={stats.avgOrderValue}
          format="currency"
          currency="USD"
          className="mt-3 block text-xl font-semibold text-primary"
        />
        <p className="mt-1 text-xs text-tertiary">Excluding cancelled</p>
      </div>
    </section>
  );
}
