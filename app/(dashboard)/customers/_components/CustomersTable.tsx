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
import type { Customer, CustomerStatus } from "@/data/mock-customers";
import { CUSTOMER_STATUSES } from "@/data/mock-customers";

const COLUMNS = [
  { id: "customer" as const, label: "Customer", allowsSorting: true },
  { id: "company" as const, label: "Company", allowsSorting: true },
  { id: "status" as const, label: "Status", allowsSorting: true },
  { id: "orders" as const, label: "Orders", allowsSorting: true },
  { id: "totalSpent" as const, label: "Total spent", allowsSorting: true },
  { id: "lastOrder" as const, label: "Last order", allowsSorting: true },
  { id: "actions" as const, label: "" },
];

const STATUS_BADGE_COLOR: Record<
  CustomerStatus,
  "error" | "brand" | "blue" | "gray" | "success" | "warning"
> = {
  Active: "success",
  Inactive: "gray",
  Lead: "warning",
};

const STATUS_FILTER_OPTIONS: (CustomerStatus | "All")[] = [
  "All",
  ...CUSTOMER_STATUSES,
];

const PAGE_SIZES = [10, 20, 50] as const;

function formatTableDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type CustomersTableProps = {
  customers: Customer[];
};

export function CustomersTable({ customers }: CustomersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "All">(
    "All"
  );
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "lastOrder",
    direction: "descending",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredBySearch = useMemo(() => {
    if (!search.trim()) return customers;
    const q = search.trim().toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.company?.toLowerCase().includes(q) ?? false)
    );
  }, [customers, search]);

  const filteredByStatus = useMemo(() => {
    if (statusFilter === "All") return filteredBySearch;
    return filteredBySearch.filter((c) => c.status === statusFilter);
  }, [filteredBySearch, statusFilter]);

  type SortColumn =
    | "customer"
    | "company"
    | "status"
    | "orders"
    | "totalSpent"
    | "lastOrder";

  const sorted = useMemo(() => {
    const list = [...filteredByStatus];
    const col = sortDescriptor.column as SortColumn | undefined;
    const dir = sortDescriptor.direction === "ascending" ? 1 : -1;
    if (col) {
      list.sort((a, b) => {
        let cmp = 0;
        if (col === "customer") cmp = a.name.localeCompare(b.name);
        else if (col === "company")
          cmp = (a.company ?? "").localeCompare(b.company ?? "");
        else if (col === "status") cmp = a.status.localeCompare(b.status);
        else if (col === "orders") cmp = a.totalOrders - b.totalOrders;
        else if (col === "totalSpent")
          cmp =
            parseFloat(a.totalSpent.replace(/[^0-9.-]+/g, "")) -
            parseFloat(b.totalSpent.replace(/[^0-9.-]+/g, ""));
        else if (col === "lastOrder") {
          const da = a.lastOrderDate ? new Date(a.lastOrderDate).getTime() : 0;
          const db = b.lastOrderDate ? new Date(b.lastOrderDate).getTime() : 0;
          cmp = da - db;
        }
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
          <h2 className="text-lg font-semibold text-primary">All customers</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-full sm:w-56">
              <Input
                type="search"
                icon={SearchMd}
                placeholder="Search by name, email, company..."
                value={search}
                onChange={setSearch}
                aria-label="Search customers"
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
            if (key != null) setStatusFilter(key as CustomerStatus | "All");
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
              {selectedCount} customer{selectedCount !== 1 ? "s" : ""} selected
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
              No customers match your filters
            </p>
            <p className="mt-1 max-w-sm text-sm text-tertiary">
              Try adjusting the search query or status filter to find what you
              need.
            </p>
          </div>
        ) : (
          <Table
            aria-label="Customers"
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
                  isRowHeader={column.id === "customer"}
                  className={column.id === "actions" ? "w-12 min-w-12" : ""}
                />
              )}
            </Table.Header>
            <Table.Body items={pageItems}>
              {(customer) => (
                <Table.Row id={customer.id} columns={COLUMNS}>
                  {(column) => (
                    <Table.Cell
                      key={column.id}
                      className={
                        column.id === "customer" || column.id === "company"
                          ? "w-full"
                          : column.id === "actions"
                            ? "w-12 min-w-12"
                            : "w-px whitespace-nowrap"
                      }
                    >
                      {column.id === "customer" && (
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-primary">
                            {customer.name}
                          </p>
                          <p className="truncate text-sm text-tertiary">
                            {customer.email}
                          </p>
                        </div>
                      )}
                      {column.id === "company" && (
                        <span className="text-sm text-primary">
                          {customer.company ?? "—"}
                        </span>
                      )}
                      {column.id === "status" && (
                        <BadgeWithDot
                          size="sm"
                          color={STATUS_BADGE_COLOR[customer.status]}
                        >
                          {customer.status}
                        </BadgeWithDot>
                      )}
                      {column.id === "orders" && (
                        <span className="text-sm font-medium tabular-nums text-primary">
                          {customer.totalOrders}
                        </span>
                      )}
                      {column.id === "totalSpent" && (
                        <span className="text-sm font-medium tabular-nums text-primary">
                          {customer.totalSpent}
                        </span>
                      )}
                      {column.id === "lastOrder" && (
                        <span className="text-sm text-primary">
                          {formatTableDate(customer.lastOrderDate)}
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
            customers
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
