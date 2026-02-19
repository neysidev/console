"use client";

import { TrendUp01 } from "@untitledui/icons";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { Customer } from "@/data/mock-customers";
import { getCustomerStats } from "@/data/mock-customers";

type CustomersStatsProps = {
  customers: Customer[];
};

const statCardClass =
  "rounded-xl border border-gray-200 bg-primary p-5 shadow-xs transition-shadow hover:shadow-sm";

export function CustomersStats({ customers }: CustomersStatsProps) {
  const stats = getCustomerStats(customers);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Total customers
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <AnimatedNumber
            value={stats.totalCustomers}
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
                value={stats.customersChangeValue / 100}
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
          Active
        </p>
        <AnimatedNumber
          value={stats.activeCount}
          format="integer"
          className="mt-3 block text-xl font-semibold text-primary"
        />
        <p className="mt-1 text-xs text-tertiary">
          Customers with recent activity
        </p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          New this month
        </p>
        <AnimatedNumber
          value={stats.newThisMonth}
          format="integer"
          className="mt-3 block text-xl font-semibold text-primary"
        />
        <p className="mt-1 text-xs text-tertiary">Signed up in current month</p>
      </div>

      <div className={statCardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Avg. customer value
        </p>
        <AnimatedNumber
          value={stats.avgCustomerValue}
          format="currency"
          currency="USD"
          className="mt-3 block text-xl font-semibold text-primary"
        />
        <p className="mt-1 text-xs text-tertiary">
          Lifetime value per customer
        </p>
      </div>
    </section>
  );
}
