"use client";

import { TransactionsTable } from "./TransactionsTable";
import { MOCK_BANK_TRANSACTIONS } from "@/data/mock-bank-transactions";

export function TransactionsContent() {
  return (
    <div className="space-y-8">
      <TransactionsTable transactions={MOCK_BANK_TRANSACTIONS} />
    </div>
  );
}
