"use client";

import { TrendDown01, TrendUp01 } from "@untitledui/icons";
import { MOCK_EXCHANGE_RATES } from "@/data/mock-bank-accounts";

export function ForeignCurrencyRates() {
  return (
    <section className="rounded-xl border border-gray-200 bg-primary p-4 shadow-xs">
      <p className="text-xs font-medium uppercase tracking-wide text-tertiary mb-3">
        Exchange rates to USD
      </p>
      <div className="flex flex-wrap gap-6">
        {MOCK_EXCHANGE_RATES.map(({ currency, rate, change }) => (
          <div key={currency} className="flex items-center gap-2">
            <span className="text-sm font-medium text-primary">
              1 {currency} = ${rate.toFixed(4)}
            </span>
            {change !== 0 && (
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {change > 0 ? (
                  <TrendUp01 className="size-3.5" />
                ) : (
                  <TrendDown01 className="size-3.5" />
                )}
                {change > 0 ? "+" : ""}
                {change}%
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
