"use client";

import { MOCK_WALLET_TOTAL } from "@/data/mock-wallet";

const total = MOCK_WALLET_TOTAL.available + MOCK_WALLET_TOTAL.pending;
const formattedTotal = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(total);
const formattedAvailable = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(MOCK_WALLET_TOTAL.available);
const formattedPending = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(MOCK_WALLET_TOTAL.pending);

export function WalletBalanceCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-primary p-6 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
        Total balance
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-primary sm:text-3xl">
        {formattedTotal}
      </p>
      <div className="mt-4 flex flex-wrap gap-6 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-tertiary">Available</p>
          <p className="mt-0.5 text-sm font-medium tabular-nums text-primary">
            {formattedAvailable}
          </p>
        </div>
        <div>
          <p className="text-xs text-tertiary">Pending</p>
          <p className="mt-0.5 text-sm font-medium tabular-nums text-primary">
            {formattedPending}
          </p>
        </div>
      </div>
    </div>
  );
}
