"use client";

import Link from "next/link";
import { Bank, CreditCard02, ChevronRight } from "@untitledui/icons";
import { MOCK_LINKED_COUNTS } from "@/data/mock-wallet";

const cardClass =
  "flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-primary p-4 shadow-xs outline-none transition-colors hover:bg-secondary hover:border-gray-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function WalletLinked() {
  return (
    <section>
      <h2 className="mb-4 text-sm font-medium text-secondary">
        Linked to wallet
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/bank-accounts/local-currency" className={cardClass}>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-tertiary">
              <Bank className="size-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Bank accounts</p>
              <p className="text-xs text-tertiary">
                {MOCK_LINKED_COUNTS.bankAccounts} account
                {MOCK_LINKED_COUNTS.bankAccounts !== 1 ? "s" : ""} linked
              </p>
            </div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-tertiary" aria-hidden />
        </Link>
        <Link href="/cards" className={cardClass}>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-tertiary">
              <CreditCard02 className="size-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Cards</p>
              <p className="text-xs text-tertiary">
                {MOCK_LINKED_COUNTS.cards} card
                {MOCK_LINKED_COUNTS.cards !== 1 ? "s" : ""} linked
              </p>
            </div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-tertiary" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
