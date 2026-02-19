"use client";

import { useState, useRef } from "react";
import { Button } from "react-aria-components";
import { Plus } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import type { Transfer } from "@/data/mock-transfers";
import { MOCK_ACCOUNTS } from "@/data/mock-transfers";

const CURRENCIES = ["USD", "EUR", "GBP"] as const;

type NewTransferFormProps = {
  onSuccess: (transfer: Transfer) => void;
  formRef?: React.RefObject<HTMLDivElement | null>;
};

function generateReference(): string {
  const n = 8000 + Math.floor(Math.random() * 999);
  return `TRF-${n}`;
}

function generateId(): string {
  return crypto.randomUUID?.() ?? `t-${Date.now()}`;
}

export function NewTransferForm({ onSuccess, formRef }: NewTransferFormProps) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<string>("USD");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAccount || !toAccount || !amount.trim()) return;
    const num = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
    if (Number.isNaN(num) || num <= 0) return;
    if (fromAccount === toAccount) return;

    setIsSubmitting(true);
    setSubmitted(false);
    try {
      await new Promise((r) => setTimeout(r, 600));
      const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "£";
      const fromLabel =
        MOCK_ACCOUNTS.find((a) => a.id === fromAccount)?.label ?? fromAccount;
      const toLabel =
        MOCK_ACCOUNTS.find((a) => a.id === toAccount)?.label ?? toAccount;

      const newTransfer: Transfer = {
        id: generateId(),
        reference: generateReference(),
        fromAccount: fromLabel,
        toAccount: toLabel,
        amount: `${symbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        currency,
        status: "Pending",
        date: new Date().toISOString(),
        note: note.trim() || undefined,
      };
      onSuccess(newTransfer);
      setFromAccount("");
      setToAccount("");
      setAmount("");
      setNote("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const accountOptions = MOCK_ACCOUNTS.map((a) => (
    <option key={a.id} value={a.id}>
      {a.label}
    </option>
  ));

  return (
    <section
      ref={formRef}
      className="rounded-xl border border-gray-200 bg-primary p-6 shadow-xs"
    >
      <h2 className="text-lg font-semibold text-primary mb-4">New transfer</h2>
      {submitted && (
        <p className="mb-4 text-sm font-medium text-green-600">
          Transfer initiated. It will appear in your history with status
          &quot;Pending&quot;.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="new-transfer-from">From account</Label>
            <select
              id="new-transfer-from"
              required
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-primary px-3 py-2 text-sm text-primary shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              <option value="">Select account</option>
              {accountOptions}
            </select>
          </div>
          <div>
            <Label htmlFor="new-transfer-to">To account</Label>
            <select
              id="new-transfer-to"
              required
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-primary px-3 py-2 text-sm text-primary shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              <option value="">Select account</option>
              {accountOptions}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="new-transfer-amount">Amount</Label>
            <Input
              id="new-transfer-amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={setAmount}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="new-transfer-currency">Currency</Label>
            <select
              id="new-transfer-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-primary px-3 py-2 text-sm text-primary shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Label htmlFor="new-transfer-note">Note (optional)</Label>
          <Input
            id="new-transfer-note"
            type="text"
            placeholder="e.g. Rent payment"
            value={note}
            onChange={setNote}
            className="mt-1.5"
          />
        </div>
        <Button
          type="submit"
          isDisabled={
            isSubmitting || !fromAccount || !toAccount || !amount.trim()
          }
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black bg-black px-4 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-50 data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
        >
          <Plus className="size-5" />
          {isSubmitting ? "Creating…" : "Create transfer"}
        </Button>
      </form>
    </section>
  );
}
