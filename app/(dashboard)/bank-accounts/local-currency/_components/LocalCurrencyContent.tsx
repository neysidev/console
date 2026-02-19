"use client";

import { LocalCurrencyStats } from "./LocalCurrencyStats";
import { LocalCurrencyAccountList } from "./LocalCurrencyAccountList";
import { MOCK_LOCAL_ACCOUNTS } from "@/data/mock-bank-accounts";

export function LocalCurrencyContent() {
  return (
    <div className="space-y-8">
      <LocalCurrencyStats accounts={MOCK_LOCAL_ACCOUNTS} />
      <LocalCurrencyAccountList accounts={MOCK_LOCAL_ACCOUNTS} />
    </div>
  );
}
