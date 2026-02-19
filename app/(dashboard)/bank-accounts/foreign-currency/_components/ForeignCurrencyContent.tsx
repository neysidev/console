"use client";

import { ForeignCurrencyRates } from "./ForeignCurrencyRates";
import { ForeignCurrencyStats } from "./ForeignCurrencyStats";
import { ForeignCurrencyAccountList } from "./ForeignCurrencyAccountList";
import { MOCK_FOREIGN_ACCOUNTS } from "@/data/mock-bank-accounts";

export function ForeignCurrencyContent() {
  return (
    <div className="space-y-8">
      <ForeignCurrencyRates />
      <ForeignCurrencyStats accounts={MOCK_FOREIGN_ACCOUNTS} />
      <ForeignCurrencyAccountList accounts={MOCK_FOREIGN_ACCOUNTS} />
    </div>
  );
}
