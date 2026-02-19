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
import type { Order, OrderStatus } from "@/data/mock-orders";
import { ORDER_STATUSES } from "@/data/mock-orders";

const COLUMNS = [
  { id: "orderNumber" as const, label: "Order", allowsSorting: true },
  { id: "customer" as const, label: "Customer", allowsSorting: true },
  { id: "status" as const, label: "Status", allowsSorting: true },
  { id: "amount" as const, label: "Amount", allowsSorting: true },
  { id: "date" as const, label: "Date", allowsSorting: true },
  { id: "actions" as const, label: "" },
];

const STATUS_BADGE_COLOR: Record<
  OrderStatus,
  "error" | "brand" | "blue" | "gray" | "success" | "warning"
> = {
  Pending: "warning",
  Processing: "blue",
  Shipped: "brand",
  Delivered: "success",
  Cancelled: "error",
};

const STATUS_FILTER_OPTIONS: (OrderStatus | "All")[] = [
  "All",
  ...ORDER_STATUSES,
];

const PAGE_SIZES = [10, 20, 50] as const;

function formatTableDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type OrdersTableProps = {
  orders: Order[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredBySearch = useMemo(() => {
    if (!search.trim()) return orders;
    const q = search.trim().toLowerCase();
    return orders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
    );
  }, [orders, search]);

  const filteredByStatus = useMemo(() => {
    if (statusFilter === "All") return filteredBySearch;
    return filteredBySearch.filter((o) => o.status === statusFilter);
  }, [filteredBySearch, statusFilter]);

  const sorted = useMemo(() => {
    const list = [...filteredByStatus];
    const col = sortDescriptor.column as keyof Order | "customer" | undefined;
    const dir = sortDescriptor.direction === "ascending" ? 1 : -1;
    if (
      col &&
      (col === "orderNumber" ||
        col === "customer" ||
        col === "status" ||
        col === "amount" ||
        col === "date")
    ) {
      list.sort((a, b) => {
        let cmp = 0;
        if (col === "orderNumber")
          cmp = a.orderNumber.localeCompare(b.orderNumber);
        else if (col === "customer")
          cmp = a.customerName.localeCompare(b.customerName);
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
      {/* Toolbar: title, status filter, search, filter button */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-primary">All orders</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-full sm:w-56">
              <Input
                type="search"
                icon={SearchMd}
                placeholder="Search by order, customer..."
                value={search}
                onChange={setSearch}
                aria-label="Search orders"
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

        {/* Status tabs */}
        <ButtonGroupRoot
          aria-label="Filter by status"
          selectedKeys={new Set([statusFilter])}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            if (key != null) setStatusFilter(key as OrderStatus | "All");
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
        {/* Bulk actions bar */}
        {bulkBarVisible && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-secondary bg-secondary px-4 py-3 md:px-6">
            <p className="text-sm font-medium text-primary">
              {selectedCount} order{selectedCount !== 1 ? "s" : ""} selected
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
              <Dropdown.Root>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-primary px-2.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50"
                  aria-label="Update status"
                >
                  Update status
                  <ChevronRight className="size-4 rotate-90" />
                </button>
                <Dropdown.Popover className="w-48">
                  <Dropdown.Menu>
                    {ORDER_STATUSES.filter((s) => s !== "Cancelled").map(
                      (s) => (
                        <Dropdown.Item key={s} id={s} label={s} />
                      )
                    )}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.Root>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-utility-error-200 bg-utility-error-50 px-2.5 text-xs font-medium text-utility-error-700 hover:bg-utility-error-100"
                onClick={() => {}}
              >
                Cancel orders
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
              No orders match your filters
            </p>
            <p className="mt-1 max-w-sm text-sm text-tertiary">
              Try adjusting the search query or status filter to find what you
              need.
            </p>
          </div>
        ) : (
          <Table
            aria-label="Orders"
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
                  isRowHeader={column.id === "orderNumber"}
                  className={column.id === "actions" ? "w-12 min-w-12" : ""}
                />
              )}
            </Table.Header>
            <Table.Body items={pageItems}>
              {(order) => (
                <Table.Row id={order.id} columns={COLUMNS}>
                  {(column) => (
                    <Table.Cell
                      key={column.id}
                      className={
                        column.id === "orderNumber" || column.id === "customer"
                          ? "w-full"
                          : column.id === "actions"
                            ? "w-12 min-w-12"
                            : "w-px whitespace-nowrap"
                      }
                    >
                      {column.id === "orderNumber" && (
                        <span className="text-sm font-medium text-primary">
                          {order.orderNumber}
                        </span>
                      )}
                      {column.id === "customer" && (
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-primary">
                            {order.customerName}
                          </p>
                          <p className="truncate text-sm text-tertiary">
                            {order.customerEmail}
                          </p>
                        </div>
                      )}
                      {column.id === "status" && (
                        <BadgeWithDot
                          size="sm"
                          color={STATUS_BADGE_COLOR[order.status]}
                        >
                          {order.status}
                        </BadgeWithDot>
                      )}
                      {column.id === "amount" && (
                        <span className="text-sm font-medium tabular-nums text-primary">
                          {order.amount}
                        </span>
                      )}
                      {column.id === "date" && (
                        <span className="text-sm text-primary">
                          {formatTableDate(order.date)}
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

        {/* Pagination footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-secondary px-4 py-3 md:px-6">
          <p className="text-sm text-tertiary">
            Showing{" "}
            <span className="font-medium text-primary">
              {totalCount === 0 ? 0 : start + 1}–
              {Math.min(start + pageSize, totalCount)}
            </span>{" "}
            of <span className="font-medium text-primary">{totalCount}</span>{" "}
            orders
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
