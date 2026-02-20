"use client";

import { useState } from "react";
import { Button } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Avatar } from "@/components/ui/Avatar";
import {
  Rocket01,
  Mail01,
  Globe01,
  Check,
  ChevronDown,
} from "@untitledui/icons";

const PRICE_PER_SEAT_MONTHLY = 10;
const PRICE_PER_SEAT_ANNUAL_YEAR = 50; // $50/seat/year (displayed as $8.33/seat/month)
const ANNUAL_DISCOUNT_PERCENT = 20;
const GST_PERCENT = 10;

type BillingCycle = "monthly" | "annual";

function SummaryCard({
  seats,
  billingCycle,
}: {
  seats: number;
  billingCycle: BillingCycle;
}) {
  const [discountCode, setDiscountCode] = useState("FRIENDS");
  const discountValid = discountCode.toUpperCase() === "FRIENDS";
  const subtotal =
    billingCycle === "annual"
      ? seats * PRICE_PER_SEAT_ANNUAL_YEAR
      : seats * PRICE_PER_SEAT_MONTHLY * 12;
  const licensePeriod =
    billingCycle === "annual"
      ? "Oct 11 2025 – Oct 11 2026"
      : "Monthly subscription";
  const discountAmount =
    billingCycle === "annual" ? subtotal * (ANNUAL_DISCOUNT_PERCENT / 100) : 0;
  const codeDiscount = discountValid ? 20 : 0;
  const afterDiscount = subtotal - discountAmount - codeDiscount;
  const gst = afterDiscount * (GST_PERCENT / 100);
  const totalDue = afterDiscount + gst;

  return (
    <div className="rounded-xl border border-gray-200 bg-primary p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-primary dark:text-white">
          Summary
        </h2>
        <div className="flex items-center gap-2">
          <Button
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-primary px-2.5 py-1.5 text-xs font-medium text-primary shadow-xs outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500"
            aria-label="Upgrade to PRO"
          >
            <Rocket01 className="size-3.5" aria-hidden />
            Upgrade to PRO
          </Button>
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            shape="circle"
            className="size-8 shrink-0"
          />
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-secondary p-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary shadow-xs dark:bg-gray-900 dark:text-gray-500">
          V
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-primary dark:text-white">
            Voxel Labs
          </p>
          <p className="truncate text-xs text-tertiary dark:text-gray-500">
            admin@voxellabs.com
          </p>
        </div>
        <ChevronDown
          className="size-4 shrink-0 text-tertiary dark:text-gray-500"
          aria-hidden
        />
      </div>

      <div className="mb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <p className="text-sm font-medium text-primary dark:text-white">
            <AnimatedNumber value={seats} format="integer" className="inline" />
            x PRO license
          </p>
          <p className="text-xs text-tertiary dark:text-gray-500">
            {licensePeriod}
          </p>
        </div>
        <span className="text-sm font-medium text-primary dark:text-white">
          <AnimatedNumber
            value={subtotal}
            format="currency"
            currency="USD"
            className="inline"
          />
        </span>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-medium text-secondary dark:text-gray-500">
          Discount code
        </label>
        <div className="relative">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-primary px-3 py-2 pr-9 text-sm text-primary outline-none transition-colors placeholder:text-placeholder focus:ring-2 focus:ring-primary dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500   "
            placeholder="Enter code"
            aria-label="Discount code"
          />
          {discountValid && (
            <span
              className="absolute right-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-success-600 text-white"
              aria-hidden
            >
              <Check className="size-3" />
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-4 text-sm">
        <div className="flex justify-between text-secondary">
          <span>Subtotal</span>
          <span>
            <AnimatedNumber
              value={subtotal}
              format="currency"
              currency="USD"
              className="inline"
            />
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-success-600">
            <span>Discount {ANNUAL_DISCOUNT_PERCENT}%</span>
            <span>
              -
              <AnimatedNumber
                value={discountAmount}
                format="currency"
                currency="USD"
                className="inline"
              />
            </span>
          </div>
        )}
        <div className="flex justify-between text-secondary">
          <span>GST {GST_PERCENT}%</span>
          <span>
            +
            <AnimatedNumber
              value={gst}
              format="currency"
              currency="USD"
              className="inline"
            />
          </span>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">Due today</span>
        <span className="text-xl font-semibold text-primary">
          <AnimatedNumber
            value={totalDue}
            format="currency"
            currency="USD"
            className="inline"
          />
        </span>
      </div>

      <Button
        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-xs outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Continue to payment"
      >
        Continue to payment
      </Button>
    </div>
  );
}

export function UpgradeProContent() {
  const [seats, setSeats] = useState(2);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="min-w-0 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-primary dark:text-white">
            Upgrade to PRO
          </h1>
        </div>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-primary dark:text-white">
            Plan details
          </h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-secondary dark:text-gray-500">
              Number of seats
            </label>
            <p className="text-sm text-tertiary dark:text-gray-500">
              Select how many seats you need.
            </p>
            <div className="flex w-fit items-center gap-0 rounded-lg border border-gray-300 bg-primary shadow-xs ring-1 ring-primary ring-inset dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500 dark:ring-gray-800">
              <Button
                onPress={() => setSeats((s) => Math.max(1, s - 1))}
                className="flex size-10 cursor-pointer items-center justify-center rounded-l-lg text-tertiary transition-colors hover:bg-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset dark:text-gray-500"
                aria-label="Decrease seats"
              >
                −
              </Button>
              <span
                className="flex min-w-12 items-center justify-center border-x border-gray-200 px-3 py-2 text-sm font-medium text-primary dark:border-gray-800 dark:text-gray-500"
                aria-live="polite"
              >
                <AnimatedNumber
                  value={seats}
                  format="integer"
                  className="inline"
                />
              </span>
              <Button
                onPress={() => setSeats((s) => s + 1)}
                className="flex size-10 cursor-pointer items-center justify-center rounded-r-lg text-tertiary transition-colors hover:bg-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset dark:text-gray-500"
                aria-label="Increase seats"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-secondary dark:text-gray-500">
              Billing cycle
            </label>
            <p className="text-sm text-tertiary dark:text-gray-500">
              Pay annually for a 20% discount.
            </p>
            <div className="flex flex-col gap-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-primary p-4 shadow-xs transition-colors has-checked:border-primary has-checked:ring-2 has-checked:ring-primary has-checked:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500">
                <input
                  type="radio"
                  name="billing"
                  value="monthly"
                  checked={billingCycle === "monthly"}
                  onChange={() => setBillingCycle("monthly")}
                  className="mt-0.5 size-4 border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-primary dark:text-white">
                    Pay monthly
                  </span>
                  <span className="ml-1 text-sm text-tertiary dark:text-gray-500">
                    $10 per seat / month
                  </span>
                </div>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-primary p-4 shadow-xs transition-colors has-checked:border-primary has-checked:ring-2 has-checked:ring-primary has-checked:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500">
                <input
                  type="radio"
                  name="billing"
                  value="annual"
                  checked={billingCycle === "annual"}
                  onChange={() => setBillingCycle("annual")}
                  className="mt-0.5 size-4 border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-primary dark:text-white">
                    Pay annually
                  </span>
                  <span className="ml-1 inline-flex items-center gap-1.5 text-sm">
                    <span className="text-tertiary dark:text-gray-500">
                      $8.33 per seat / month
                    </span>
                    <span className="rounded bg-success-50 px-1.5 py-0.5 text-xs font-medium text-success-700 dark:text-success-700">
                      Save 20%
                    </span>
                  </span>
                </div>
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-primary dark:text-white">
            Invoice details
          </h2>

          <div className="grid gap-4 sm:grid-cols-1">
            <Input
              label="Email address"
              placeholder="you@company.com"
              defaultValue="admin@voxellabs.com"
              icon={Mail01}
              hint="Invoices will be sent to this email address."
              isRequired
            />
            <p className="-mt-2 text-xs font-medium text-primary dark:text-white">
              <button
                type="button"
                className="outline-none hover:underline focus-visible:underline"
              >
                + Add another
              </button>
            </p>
            <Input
              label="Full name or Company name"
              placeholder="Caitlyn King"
              defaultValue="Caitlyn King"
              isRequired
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-secondary dark:text-gray-500">
                Country <span className="text-brand-tertiary">*</span>
              </label>
              <div className="relative">
                <Globe01 className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-fg-quaternary dark:text-gray-500" />
                <select
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-primary py-2 pl-10 pr-8 text-sm text-primary outline-none transition-colors focus:ring-2 focus:ring-primary dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500"
                  defaultValue="CH"
                  aria-label="Country"
                >
                  <option value="CH">Switzerland</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-tertiary dark:text-gray-500"
                  aria-hidden
                />
              </div>
            </div>
            <Input
              label="Street address"
              placeholder="Spiegelgasse 12"
              defaultValue="Spiegelgasse 12"
              isRequired
            />
            <Input
              label="City"
              placeholder="Zürich"
              defaultValue="Zürich"
              isRequired
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="State / Province" placeholder="e.g. California" />
              <Input label="Postcode" placeholder="e.g. 8001" />
            </div>
          </div>
        </section>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <SummaryCard seats={seats} billingCycle={billingCycle} />
      </div>
    </div>
  );
}
