"use client";

import type { LocalCurrencyAccount } from "@/data/mock-bank-accounts";

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

type LocalCurrencyStatsProps = {
  accounts: LocalCurrencyAccount[];
};

export function LocalCurrencyStats({ accounts }: LocalCurrencyStatsProps) {
  const byCurrency = accounts.reduce<Record<string, number>>((acc, a) => {
    acc[a.currency] = (acc[a.currency] ?? 0) + a.balance;
    return acc;
  }, {});
  const totalAccounts = accounts.length;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className={cardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Balance by currency
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(byCurrency).map(([currency, balance]) => (
            <span
              key={currency}
              className="text-lg font-semibold tabular-nums text-primary"
            >
              {formatMoney(balance, currency)}
            </span>
          ))}
        </div>
        <p className="mt-1 text-xs text-tertiary">
          Across {totalAccounts} local account{totalAccounts !== 1 ? "s" : ""}
        </p>
      </div>
      <div className={cardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Accounts
        </p>
        <p className="mt-3 text-xl font-semibold tabular-nums text-primary">
          {totalAccounts}
        </p>
        <p className="mt-1 text-xs text-tertiary">Local currency accounts</p>
      </div>
      <div className={cardClass}>
        <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
          Currencies
        </p>
        <p className="mt-3 text-xl font-semibold text-primary">
          {Object.keys(byCurrency).join(", ")}
        </p>
      </div>
    </section>
  );
}
