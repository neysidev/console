"use client";

import { useMemo, useState } from "react";
import {
  Download01,
  FilterLines,
  SearchMd,
  ChevronLeft,
  ChevronRight,
} from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import {
  Table,
  TableCard,
  TableRowActionsDropdown,
} from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import type {
  BankTransaction,
  BankTransactionType,
} from "@/data/mock-bank-transactions";
import { BANK_TRANSACTION_TYPES } from "@/data/mock-bank-transactions";

const COLUMNS = [
  { id: "date" as const, label: "Date", allowsSorting: true },
  { id: "description" as const, label: "Description", allowsSorting: true },
  { id: "account" as const, label: "Account", allowsSorting: true },
  { id: "type" as const, label: "Type", allowsSorting: true },
  { id: "amount" as const, label: "Amount", allowsSorting: true },
  { id: "balance" as const, label: "Balance after", allowsSorting: true },
  { id: "actions" as const, label: "" },
];

const TYPE_COLOR: Record<
  BankTransactionType,
  "success" | "error" | "brand" | "gray" | "blue" | "warning"
> = {
  Credit: "success",
  "Transfer In": "success",
  Interest: "success",
  Debit: "error",
  "Transfer Out": "error",
  Fee: "error",
};

const PAGE_SIZES = [10, 20, 50] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: amount >= 0 ? "auto" : "always",
  }).format(amount);
}

type TransactionsTableProps = {
  transactions: BankTransaction[];
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<BankTransactionType | "All">(
    "All"
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredBySearch = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = search.trim().toLowerCase();
    return transactions.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.accountLabel.toLowerCase().includes(q) ||
        (t.reference && t.reference.toLowerCase().includes(q))
    );
  }, [transactions, search]);

  const filteredByType = useMemo(() => {
    if (typeFilter === "All") return filteredBySearch;
    return filteredBySearch.filter((t) => t.type === typeFilter);
  }, [filteredBySearch, typeFilter]);

  const sorted = useMemo(() => {
    const list = [...filteredByType];
    const col = sortDescriptor.column as string | undefined;
    const dir = sortDescriptor.direction === "ascending" ? 1 : -1;
    if (col) {
      list.sort((a, b) => {
        let cmp = 0;
        if (col === "date")
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
        else if (col === "description")
          cmp = a.description.localeCompare(b.description);
        else if (col === "account")
          cmp = a.accountLabel.localeCompare(b.accountLabel);
        else if (col === "type") cmp = a.type.localeCompare(b.type);
        else if (col === "amount") cmp = a.amount - b.amount;
        else if (col === "balance") cmp = a.balanceAfter - b.balanceAfter;
        return cmp * dir;
      });
    }
    return list;
  }, [filteredByType, sortDescriptor]);

  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);

  const typeOptions: (BankTransactionType | "All")[] = [
    "All",
    ...BANK_TRANSACTION_TYPES,
  ];

  return (
    <section>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-primary">
            Transaction history
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-full sm:w-56">
              <Input
                type="search"
                icon={SearchMd}
                placeholder="Search by description, account..."
                value={search}
                onChange={setSearch}
                aria-label="Search transactions"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-primary px-3 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50"
              aria-label="Open filters"
            >
              <FilterLines className="size-5 text-gray-500" />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-primary px-3 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50"
            >
              <Download01 className="size-5" />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {typeOptions.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setTypeFilter(type);
                setPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                typeFilter === type
                  ? "bg-black text-white"
                  : "bg-secondary text-tertiary hover:bg-gray-100 hover:text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <TableCard.Root size="md" className="mt-4">
        {totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <p className="text-sm font-medium text-primary">
              No transactions match your filters
            </p>
            <p className="mt-1 max-w-sm text-sm text-tertiary">
              Try adjusting the search or type filter.
            </p>
          </div>
        ) : (
          <Table
            aria-label="Transactions"
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <Table.Header columns={COLUMNS}>
              {(column) => (
                <Table.Head
                  key={column.id}
                  id={column.id}
                  label={column.label}
                  allowsSorting={column.allowsSorting}
                  className={column.id === "actions" ? "w-12 min-w-12" : ""}
                  isRowHeader={column.id === "description"}
                />
              )}
            </Table.Header>
            <Table.Body items={pageItems}>
              {(tx) => (
                <Table.Row id={tx.id} columns={COLUMNS}>
                  {(column) => (
                    <Table.Cell key={column.id}>
                      {column.id === "date" && (
                        <span className="text-sm text-primary">
                          {formatDate(tx.date)}
                        </span>
                      )}
                      {column.id === "description" && (
                        <div>
                          <p className="text-sm font-medium text-primary">
                            {tx.description}
                          </p>
                          {tx.reference && (
                            <p className="text-xs text-tertiary">
                              {tx.reference}
                            </p>
                          )}
                        </div>
                      )}
                      {column.id === "account" && (
                        <span className="text-sm text-tertiary">
                          {tx.accountLabel}
                        </span>
                      )}
                      {column.id === "type" && (
                        <Badge size="sm" color={TYPE_COLOR[tx.type]}>
                          {tx.type}
                        </Badge>
                      )}
                      {column.id === "amount" && (
                        <span
                          className={`font-medium tabular-nums ${
                            tx.amount >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {formatMoney(tx.amount, tx.currency)}
                        </span>
                      )}
                      {column.id === "balance" && (
                        <span className="tabular-nums text-tertiary">
                          {formatMoney(tx.balanceAfter, tx.currency)}
                        </span>
                      )}
                      {column.id === "actions" && <TableRowActionsDropdown />}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}

        {totalCount > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-secondary px-4 py-3 md:px-6">
            <p className="text-sm text-tertiary">
              Showing{" "}
              <span className="font-medium text-primary">
                {start + 1}–{Math.min(start + pageSize, totalCount)}
              </span>{" "}
              of <span className="font-medium text-primary">{totalCount}</span>{" "}
              transactions
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-tertiary">Rows per page</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="h-8 rounded-lg border border-gray-200 bg-primary px-2 text-sm text-primary shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  aria-label="Rows per page"
                >
                  {PAGE_SIZES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-secondary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <span className="flex h-8 min-w-16 items-center justify-center px-2 text-sm text-primary">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-secondary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Next page"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </TableCard.Root>
    </section>
  );
}
