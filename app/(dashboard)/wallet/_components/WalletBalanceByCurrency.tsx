"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { MOCK_WALLET_BALANCES } from "@/data/mock-wallet";

export function WalletBalanceByCurrency() {
  return (
    <section>
      <h2 className="mb-4 text-sm font-medium text-secondary">
        Balance by currency
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {MOCK_WALLET_BALANCES.map(
          ({ currency, symbol, available, pending }) => (
            <div
              key={currency}
              className="rounded-xl border border-gray-200 bg-primary p-4 shadow-xs"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
                {currency}
              </p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {symbol}
                <AnimatedNumber
                  value={available}
                  format="decimal"
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                />
              </p>
              {pending > 0 && (
                <p className="mt-1 text-xs text-tertiary">
                  {symbol}
                  <AnimatedNumber
                    value={pending}
                    format="decimal"
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                  />{" "}
                  pending
                </p>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
