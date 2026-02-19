"use client";

import { useState, useMemo } from "react";
import { SearchMd } from "@untitledui/icons";
import Link from "next/link";
import type { Beneficiary } from "@/data/mock-beneficiaries";
import {
  Table,
  TableCard,
  TableRowActionsDropdown,
} from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function maskIban(iban: string) {
  const cleaned = iban.replace(/\s/g, "");
  if (cleaned.length <= 8) return "•••• " + cleaned.slice(-4);
  return "•••• " + cleaned.slice(-4);
}

const COLUMNS = [
  { id: "name" as const, label: "Name" },
  { id: "bank" as const, label: "Bank" },
  { id: "iban" as const, label: "IBAN" },
  { id: "currency" as const, label: "Currency" },
  { id: "lastUsed" as const, label: "Last used" },
  { id: "actions" as const, label: "" },
];

type BeneficiariesTableProps = {
  beneficiaries: Beneficiary[];
};

export function BeneficiariesTable({ beneficiaries }: BeneficiariesTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return beneficiaries;
    const q = search.trim().toLowerCase();
    return beneficiaries.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.bankName.toLowerCase().includes(q) ||
        b.iban.toLowerCase().includes(q)
    );
  }, [beneficiaries, search]);

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">
          Saved beneficiaries
        </h2>
        <div className="w-full sm:w-64">
          <Input
            type="search"
            icon={SearchMd}
            placeholder="Search by name, bank..."
            value={search}
            onChange={setSearch}
            aria-label="Search beneficiaries"
          />
        </div>
      </div>

      <TableCard.Root size="md">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <p className="text-sm font-medium text-primary">
              {search
                ? "No beneficiaries match your search"
                : "No beneficiaries yet"}
            </p>
            <p className="mt-1 max-w-sm text-sm text-tertiary">
              {search
                ? "Try a different search term."
                : "Add a beneficiary to make transfers faster."}
            </p>
          </div>
        ) : (
          <Table aria-label="Beneficiaries" selectionMode="none">
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
            <Table.Body items={filtered}>
              {(beneficiary) => (
                <Table.Row id={beneficiary.id} columns={COLUMNS}>
                  {(column) => (
                    <Table.Cell key={column.id}>
                      {column.id === "name" && (
                        <span className="font-medium text-primary">
                          {beneficiary.name}
                        </span>
                      )}
                      {column.id === "bank" && (
                        <span className="text-tertiary">
                          {beneficiary.bankName}
                        </span>
                      )}
                      {column.id === "iban" && (
                        <span className="font-mono text-sm text-tertiary">
                          {maskIban(beneficiary.iban)}
                        </span>
                      )}
                      {column.id === "currency" && (
                        <span className="text-sm text-tertiary">
                          {beneficiary.currency}
                        </span>
                      )}
                      {column.id === "lastUsed" && (
                        <span className="text-sm text-tertiary">
                          {beneficiary.lastUsed
                            ? formatDate(beneficiary.lastUsed)
                            : "—"}
                        </span>
                      )}
                      {column.id === "actions" && (
                        <div className="flex items-center gap-1">
                          <Link
                            href="/transfers"
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            Transfer
                          </Link>
                          <span className="text-tertiary">·</span>
                          <TableRowActionsDropdown />
                        </div>
                      )}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
      </TableCard.Root>
    </section>
  );
}
