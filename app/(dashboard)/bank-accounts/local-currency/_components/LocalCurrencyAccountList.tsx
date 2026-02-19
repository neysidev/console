"use client";

import { Building07 } from "@untitledui/icons";
import type { LocalCurrencyAccount } from "@/data/mock-bank-accounts";
import {
  Table,
  TableCard,
  TableRowActionsDropdown,
} from "@/components/application/table/table";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function maskIban(iban: string) {
  const cleaned = iban.replace(/\s/g, "");
  if (cleaned.length <= 8) return "•••• " + cleaned.slice(-4);
  return "•••• " + cleaned.slice(-4);
}

const COLUMNS = [
  { id: "account" as const, label: "Account" },
  { id: "iban" as const, label: "IBAN" },
  { id: "balance" as const, label: "Balance" },
  { id: "available" as const, label: "Available" },
  { id: "actions" as const, label: "" },
];

type LocalCurrencyAccountListProps = {
  accounts: LocalCurrencyAccount[];
};

export function LocalCurrencyAccountList({
  accounts,
}: LocalCurrencyAccountListProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-primary mb-4">Your accounts</h2>
      <TableCard.Root size="md">
        <Table aria-label="Local currency accounts" selectionMode="none">
          <Table.Header columns={COLUMNS}>
            {(col) => (
              <Table.Head
                key={col.id}
                id={col.id}
                label={col.label}
                className={col.id === "actions" ? "w-12 min-w-12" : ""}
              />
            )}
          </Table.Header>
          <Table.Body items={accounts}>
            {(account) => (
              <Table.Row id={account.id} columns={COLUMNS}>
                {(column) => (
                  <Table.Cell key={column.id}>
                    {column.id === "account" && (
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                          <Building07 className="size-5 text-tertiary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary">
                            {account.accountName}
                          </p>
                          <p className="text-xs text-tertiary">
                            {account.bankName} •••• {account.lastFour}
                          </p>
                        </div>
                      </div>
                    )}
                    {column.id === "iban" && (
                      <span className="font-mono text-sm text-tertiary">
                        {maskIban(account.iban)}
                      </span>
                    )}
                    {column.id === "balance" && (
                      <span className="font-medium tabular-nums text-primary">
                        {formatMoney(account.balance, account.currency)}
                      </span>
                    )}
                    {column.id === "available" && (
                      <span className="tabular-nums text-tertiary">
                        {formatMoney(account.available, account.currency)}
                        {account.pending != null && account.pending > 0 && (
                          <span className="ml-1 text-xs">
                            (+{formatMoney(account.pending, account.currency)}{" "}
                            pending)
                          </span>
                        )}
                      </span>
                    )}
                    {column.id === "actions" && <TableRowActionsDropdown />}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    </section>
  );
}
