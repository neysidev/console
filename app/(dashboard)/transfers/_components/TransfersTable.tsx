"use client";

import { useMemo, useState } from "react";
import {
  Download01,
  FilterLines,
  SearchMd,
  ChevronLeft,
  ChevronRight,
  XClose,
} from "@untitledui/icons";
import type { Selection, SortDescriptor } from "react-aria-components";
import {
  Table,
  TableCard,
  TableRowActionsDropdown,
} from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import {
  ButtonGroupRoot,
  ButtonGroupItem,
} from "@/components/ui/base/button-group";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import type { Transfer, TransferStatus } from "@/data/mock-transfers";
import { TRANSFER_STATUSES } from "@/data/mock-transfers";

const COLUMNS = [
  { id: "reference" as const, label: "Reference", allowsSorting: true },
  { id: "fromTo" as const, label: "From → To", allowsSorting: true },
  { id: "amount" as const, label: "Amount", allowsSorting: true },
  { id: "status" as const, label: "Status", allowsSorting: true },
  { id: "date" as const, label: "Date", allowsSorting: true },
  { id: "actions" as const, label: "" },
];

const STATUS_BADGE_COLOR: Record<
  TransferStatus,
  "error" | "brand" | "blue" | "gray" | "success" | "warning"
> = {
  Completed: "success",
  Pending: "warning",
  Processing: "blue",
  Failed: "error",
  Cancelled: "gray",
};

const STATUS_FILTER_OPTIONS: (TransferStatus | "All")[] = [
  "All",
  ...TRANSFER_STATUSES,
];

const PAGE_SIZES = [10, 20, 50] as const;

function formatTableDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type TransfersTableProps = {
  transfers: Transfer[];
};

export function TransfersTable({ transfers }: TransfersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransferStatus | "All">(
    "All"
  );
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredBySearch = useMemo(() => {
    if (!search.trim()) return transfers;
    const q = search.trim().toLowerCase();
    return transfers.filter(
      (t) =>
        t.reference.toLowerCase().includes(q) ||
        t.fromAccount.toLowerCase().includes(q) ||
        t.toAccount.toLowerCase().includes(q)
    );
  }, [transfers, search]);

  const filteredByStatus = useMemo(() => {
    if (statusFilter === "All") return filteredBySearch;
    return filteredBySearch.filter((t) => t.status === statusFilter);
  }, [filteredBySearch, statusFilter]);

  const sorted = useMemo(() => {
    const list = [...filteredByStatus];
    const col = sortDescriptor.column as keyof Transfer | "fromTo" | undefined;
    const dir = sortDescriptor.direction === "ascending" ? 1 : -1;
    if (
      col &&
      (col === "reference" ||
        col === "fromTo" ||
        col === "status" ||
        col === "amount" ||
        col === "date")
    ) {
      list.sort((a, b) => {
        let cmp = 0;
        if (col === "reference") cmp = a.reference.localeCompare(b.reference);
        else if (col === "fromTo")
          cmp = a.fromAccount.localeCompare(b.fromAccount);
        else if (col === "status") cmp = a.status.localeCompare(b.status);
        else if (col === "amount")
          cmp =
            parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) -
            parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
        else if (col === "date")
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
        return cmp * dir;
      });
    }
    return list;
  }, [filteredByStatus, sortDescriptor]);

  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);

  const selectedCount =
    selectedKeys === "all"
      ? pageItems.length
      : (selectedKeys as Set<unknown>).size;

  const bulkBarVisible = selectedCount > 0;

  return (
    <section>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-primary">
            Transfer history
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-full sm:w-56">
              <Input
                type="search"
                icon={SearchMd}
                placeholder="Search by reference, account..."
                value={search}
                onChange={setSearch}
                aria-label="Search transfers"
              />
            </div>
            <Dropdown.Root>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-primary px-3 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50"
                aria-label="Open filters"
              >
                <FilterLines className="size-5 text-gray-500" />
                Filter
              </button>
              <Dropdown.Popover className="w-56">
                <Dropdown.Menu>
                  <Dropdown.Item
                    id="date"
                    label="Date range"
                    addon="Last 30 days"
                  />
                  <Dropdown.Item
                    id="status"
                    label="Status"
                    addon={statusFilter === "All" ? "All" : statusFilter}
                  />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>

        <ButtonGroupRoot
          aria-label="Filter by status"
          selectedKeys={new Set([statusFilter])}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            if (key != null) setStatusFilter(key as TransferStatus | "All");
            setPage(1);
          }}
          className="w-full flex-wrap sm:w-auto"
        >
          {STATUS_FILTER_OPTIONS.map((status) => (
            <ButtonGroupItem key={status} id={status}>
              {status}
            </ButtonGroupItem>
          ))}
        </ButtonGroupRoot>
      </div>

      <TableCard.Root size="md" className="mt-4">
        {bulkBarVisible && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-secondary bg-secondary px-4 py-3 md:px-6">
            <p className="text-sm font-medium text-primary">
              {selectedCount} transfer{selectedCount !== 1 ? "s" : ""} selected
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-primary px-2.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50"
                onClick={() => {}}
              >
                <Download01 className="size-4" />
                Export
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-tertiary hover:text-primary"
                onClick={() => setSelectedKeys(new Set())}
                aria-label="Clear selection"
              >
                <XClose className="size-4" />
                Clear
              </button>
            </div>
          </div>
        )}

        {totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <p className="text-sm font-medium text-primary">
              No transfers match your filters
            </p>
            <p className="mt-1 max-w-sm text-sm text-tertiary">
              Try adjusting the search query or status filter.
            </p>
          </div>
        ) : (
          <Table
            aria-label="Transfers"
            selectionMode="multiple"
            selectionBehavior="toggle"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
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
                  isRowHeader={column.id === "reference"}
                  className={column.id === "actions" ? "w-12 min-w-12" : ""}
                />
              )}
            </Table.Header>
            <Table.Body items={pageItems}>
              {(transfer) => (
                <Table.Row id={transfer.id} columns={COLUMNS}>
                  {(column) => (
                    <Table.Cell
                      key={column.id}
                      className={
                        column.id === "reference" || column.id === "fromTo"
                          ? "w-full"
                          : column.id === "actions"
                            ? "w-12 min-w-12"
                            : "w-px whitespace-nowrap"
                      }
                    >
                      {column.id === "reference" && (
                        <span className="text-sm font-medium text-primary">
                          {transfer.reference}
                        </span>
                      )}
                      {column.id === "fromTo" && (
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-primary">
                            {transfer.fromAccount}
                          </p>
                          <p className="truncate text-sm text-tertiary">
                            → {transfer.toAccount}
                          </p>
                        </div>
                      )}
                      {column.id === "amount" && (
                        <span className="text-sm font-medium tabular-nums text-primary">
                          {transfer.amount}
                        </span>
                      )}
                      {column.id === "status" && (
                        <BadgeWithDot
                          size="sm"
                          color={STATUS_BADGE_COLOR[transfer.status]}
                        >
                          {transfer.status}
                        </BadgeWithDot>
                      )}
                      {column.id === "date" && (
                        <span className="text-sm text-primary">
                          {formatTableDate(transfer.date)}
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

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-secondary px-4 py-3 md:px-6">
          <p className="text-sm text-tertiary">
            Showing{" "}
            <span className="font-medium text-primary">
              {totalCount === 0 ? 0 : start + 1}–
              {Math.min(start + pageSize, totalCount)}
            </span>{" "}
            of <span className="font-medium text-primary">{totalCount}</span>{" "}
            transfers
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
      </TableCard.Root>
    </section>
  );
}
