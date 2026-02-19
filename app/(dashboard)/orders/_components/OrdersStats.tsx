"use client";

import { TrendUp01 } from "@untitledui/icons";
import { BadgeWithIcon } from "@/components/base/badges/badges";
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
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Total revenue
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-xl font-semibold tabular-nums text-primary">
            {stats.totalRevenue}
          </p>
          <BadgeWithIcon
            size="sm"
            type="color"
            color="success"
            iconLeading={TrendUp01}
          >
            {stats.revenueChange}
          </BadgeWithIcon>
        </div>
        <p className="mt-1 text-xs text-tertiary">vs last period</p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Orders
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-xl font-semibold tabular-nums text-primary">
            {stats.totalOrders}
          </p>
          <BadgeWithIcon
            size="sm"
            type="color"
            color="success"
            iconLeading={TrendUp01}
          >
            {stats.ordersChange}
          </BadgeWithIcon>
        </div>
        <p className="mt-1 text-xs text-tertiary">vs last period</p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Pending
        </p>
        <p className="mt-3 text-xl font-semibold tabular-nums text-primary">
          {stats.pendingCount}
        </p>
        <p className="mt-1 text-xs text-tertiary">
          Awaiting fulfillment or payment
        </p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Avg. order value
        </p>
        <p className="mt-3 text-xl font-semibold tabular-nums text-primary">
          {stats.avgOrderValue}
        </p>
        <p className="mt-1 text-xs text-tertiary">Excluding cancelled</p>
      </div>
    </section>
  );
}
