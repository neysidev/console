"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SearchMd } from "@untitledui/icons";
import type { Selection, SortDescriptor } from "react-aria-components";
import {
  Table,
  TableCard,
  TableRowActionsDropdown,
} from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import type { TeamMember, TeamMemberStatus } from "@/data/mock-dashboard";

const COLUMNS = [
  { id: "user" as const, label: "User", allowsSorting: true },
  { id: "status" as const, label: "Status", allowsSorting: true },
  { id: "lastActive" as const, label: "Last active", allowsSorting: true },
  { id: "dateAdded" as const, label: "Date added", allowsSorting: true },
  { id: "actions" as const, label: "" },
];

const STATUS_BADGE_COLOR: Record<
  TeamMemberStatus,
  "error" | "brand" | "blue" | "gray" | "success"
> = {
  Admin: "error",
  "Data expert": "brand",
  "Data import": "blue",
  Viewer: "gray",
  Editor: "success",
};

function formatTableDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type DashboardTeamProps = {
  users: TeamMember[];
};

export function DashboardTeam({ users }: DashboardTeamProps) {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "lastActive",
    direction: "descending",
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.trim().toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    const col = sortDescriptor.column as keyof TeamMember | "user" | undefined;
    const dir = sortDescriptor.direction === "ascending" ? 1 : -1;
    if (
      col &&
      (col === "user" ||
        col === "lastActive" ||
        col === "dateAdded" ||
        col === "status")
    ) {
      list.sort((a, b) => {
        let cmp = 0;
        if (col === "user") cmp = a.name.localeCompare(b.name);
        else if (col === "status") cmp = a.status.localeCompare(b.status);
        else if (col === "lastActive")
          cmp =
            new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
        else if (col === "dateAdded")
          cmp =
            new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        return cmp * dir;
      });
    }
    return list;
  }, [filtered, sortDescriptor]);

  const selectedCount =
    selectedKeys === "all"
      ? sorted.length
      : (selectedKeys as Set<unknown>).size;

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-primary dark:text-white">
          Recently active
        </h2>
        <div className="w-full sm:w-72">
          <Input
            type="search"
            icon={SearchMd}
            placeholder="Search"
            value={search}
            onChange={setSearch}
            aria-label="Search team members"
          />
        </div>
      </div>

      <TableCard.Root size="md" className="mt-4">
        {selectedCount > 0 && (
          <div className="border-b border-border-secondary bg-secondary px-6 py-2 text-sm font-medium text-primary dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500">
            {selectedCount} selected
          </div>
        )}

        <Table
          aria-label="Recently active team members"
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
                isRowHeader={column.id === "user"}
                className={column.id === "actions" ? "w-12 min-w-12" : ""}
              />
            )}
          </Table.Header>
          <Table.Body items={sorted}>
            {(user) => (
              <Table.Row id={user.id} columns={COLUMNS}>
                {(column) => (
                  <Table.Cell
                    key={column.id}
                    className={
                      column.id === "user"
                        ? "w-full"
                        : column.id === "actions"
                          ? "w-12 min-w-12"
                          : "w-px whitespace-nowrap"
                    }
                  >
                    {column.id === "user" && (
                      <div className="flex items-center gap-3">
                        <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full bg-secondary dark:bg-gray-800">
                          <Image
                            src={user.avatar}
                            alt=""
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-primary dark:text-white">
                            {user.name}
                          </p>
                          <p className="truncate text-sm text-tertiary dark:text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    )}
                    {column.id === "status" && (
                      <BadgeWithDot
                        size="sm"
                        color={STATUS_BADGE_COLOR[user.status]}
                      >
                        {user.status}
                      </BadgeWithDot>
                    )}
                    {column.id === "lastActive" && (
                      <span className="text-sm text-primary dark:text-white">
                        {formatTableDate(user.lastActive)}
                      </span>
                    )}
                    {column.id === "dateAdded" && (
                      <span className="text-sm text-primary dark:text-white">
                        {formatTableDate(user.dateAdded)}
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
