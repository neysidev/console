"use client";

import { Button } from "react-aria-components";
import { Check } from "@untitledui/icons";

const BASIC_FEATURES = [
  "Access to all basic features",
  "Basic reporting and analytics",
  "Up to 10 individual users",
  "20GB individual data each user",
  "Basic chat and email support",
];

const BUSINESS_FEATURES = [
  "200+ integrations",
  "Advanced reporting and analytics",
  "Up to 20 individual users",
  "40GB individual data each user",
  "Priority chat and email support",
];

function PlanCard({
  title,
  price,
  features,
  buttonLabel,
  isCurrent,
}: {
  title: string;
  price: string;
  features: string[];
  buttonLabel: string;
  isCurrent: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-primary p-6 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <div className="size-2 rounded-full bg-gray-400" aria-hidden />
          </div>
          <h2 className="text-base font-semibold text-primary">{title}</h2>
        </div>
        <span className="text-sm font-semibold text-primary">{price}</span>
      </div>
      <ul className="mt-4 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-secondary"
          >
            <Check className="size-4 shrink-0 text-success-600" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`mt-6 flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium shadow-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isCurrent
            ? "border border-gray-300 bg-primary text-primary hover:bg-secondary"
            : "bg-primary text-white hover:bg-primary/90"
        }`}
        aria-label={buttonLabel}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

export function PlanCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <PlanCard
        title="Basic plan"
        price="$10/mth"
        features={BASIC_FEATURES}
        buttonLabel="Current plan"
        isCurrent
      />
      <PlanCard
        title="Business plan"
        price="$20/mth"
        features={BUSINESS_FEATURES}
        buttonLabel="Switch to this plan"
        isCurrent={false}
      />
    </div>
  );
}
