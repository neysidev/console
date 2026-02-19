"use client";

import { useState } from "react";
import {
  ButtonGroupRoot,
  ButtonGroupItem,
} from "@/components/ui/base/button-group";
import { Checkbox } from "@/components/base/checkbox/checkbox";

const INVOICES = [
  { id: "0012", label: "Invoice 0012" },
  { id: "0011", label: "Invoice 0011" },
  { id: "0010", label: "Invoice 0010" },
  { id: "0009", label: "Invoice 0009" },
];

type FilterTab = "all" | "active" | "archived";

export function PreviousInvoices() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleAll = () => {
    if (selected.size === INVOICES.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(INVOICES.map((inv) => inv.id)));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-primary">
        Previous invoices
      </h2>
      <ButtonGroupRoot
        aria-label="Filter invoices"
        selectedKeys={new Set([filter])}
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];
          if (key != null) setFilter(key as FilterTab);
        }}
        className="w-max"
      >
        <ButtonGroupItem id="all">View all</ButtonGroupItem>
        <ButtonGroupItem id="active">Active</ButtonGroupItem>
        <ButtonGroupItem id="archived">Archived</ButtonGroupItem>
      </ButtonGroupRoot>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 border-b border-gray-200 bg-secondary px-3 py-2.5">
          <Checkbox
            isSelected={
              INVOICES.length > 0 && selected.size === INVOICES.length
            }
            onChange={toggleAll}
            aria-label="Select all invoices"
            className="shrink-0"
          />
          <span className="text-xs font-medium text-primary">Select all</span>
        </div>
        <ul className="divide-y divide-gray-200 bg-primary">
          {INVOICES.map((invoice) => (
            <li
              key={invoice.id}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/50"
            >
              <Checkbox
                isSelected={selected.has(invoice.id)}
                onChange={() => toggleOne(invoice.id)}
                aria-label={`Select ${invoice.label}`}
                className="shrink-0"
              />
              <span className="text-sm font-medium text-primary">
                {invoice.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
