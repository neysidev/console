"use client";

import type { ForeignCurrencyAccount } from "@/data/mock-bank-accounts";

const cardClass =
  "rounded-xl border border-gray-200 bg-primary p-5 shadow-xs transition-shadow hover:shadow-sm";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

type ForeignCurrencyStatsProps = {
  accounts: ForeignCurrencyAccount[];
};

export function ForeignCurrencyStats({ accounts }: ForeignCurrencyStatsProps) {
  const totalUsd = accounts.reduce((sum, a) => sum + a.balanceUsd, 0);
  const totalAccounts = accounts.length;

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className={cardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Total (USD equivalent)
        </p>
        <p className="mt-3 text-xl font-semibold tabular-nums text-primary">
          {formatMoney(totalUsd, "USD")}
        </p>
        <p className="mt-1 text-xs text-tertiary">
          Across {totalAccounts} foreign currency account
          {totalAccounts !== 1 ? "s" : ""}
        </p>
      </div>
      <div className={cardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Currencies
        </p>
        <p className="mt-3 text-xl font-semibold text-primary">
          {[...new Set(accounts.map((a) => a.currency))].join(", ")}
        </p>
        <p className="mt-1 text-xs text-tertiary">Active foreign accounts</p>
      </div>
    </section>
  );
}
