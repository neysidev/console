"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { MOCK_WALLET_TOTAL } from "@/data/mock-wallet";

const total = MOCK_WALLET_TOTAL.available + MOCK_WALLET_TOTAL.pending;

export function WalletBalanceCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-primary p-6 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-tertiary">
        Total balance
      </p>
      <AnimatedNumber
        value={total}
        format="currency"
        currency="USD"
        className="mt-2 block text-2xl font-semibold text-primary sm:text-3xl"
      />
      <div className="mt-4 flex flex-wrap gap-6 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-tertiary">Available</p>
          <AnimatedNumber
            value={MOCK_WALLET_TOTAL.available}
            format="currency"
            currency="USD"
            className="mt-0.5 block text-sm font-medium text-primary"
          />
        </div>
        <div>
          <p className="text-xs text-tertiary">Pending</p>
          <AnimatedNumber
            value={MOCK_WALLET_TOTAL.pending}
            format="currency"
            currency="USD"
            className="mt-0.5 block text-sm font-medium text-primary"
          />
        </div>
      </div>
    </div>
  );
}
