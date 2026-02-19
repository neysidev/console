"use client";

import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { CURRENT_USER_CARDS } from "@/data/mock-user-cards";

export function CardsContent() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-medium text-secondary mb-4">Your cards</h2>
        <p className="text-sm text-tertiary mb-6">
          You have {CURRENT_USER_CARDS.length} card
          {CURRENT_USER_CARDS.length === 1 ? "" : "s"} on your account.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CURRENT_USER_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-xl border border-gray-200 bg-primary p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-tertiary">
                  {card.label}
                </span>
                <span className="text-xs tabular-nums text-tertiary">
                  •••• {card.lastFour}
                </span>
              </div>
              <CreditCard
                company={card.company}
                cardNumber={card.cardNumber}
                cardHolder={card.cardHolder}
                cardExpiration={card.cardExpiration}
                type={card.type}
                width={280}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
