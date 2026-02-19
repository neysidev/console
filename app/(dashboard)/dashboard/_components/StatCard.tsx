"use client";

import { TrendUp01, TrendDown01 } from "@untitledui/icons";
import { BadgeWithIcon } from "@/components/ui/base/badges/badges";

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
};

export function StatCard({ label, value, change, changeType }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-primary p-4 shadow-xs">
      <h3 className="text-xs font-medium text-gray-700">{label}</h3>

      <div className="flex items-end justify-between">
        <p className="mt-4 text-xl font-semibold text-primary">{value}</p>
        <BadgeWithIcon
          size="sm"
          type="color"
          color={changeType === "positive" ? "success" : "error"}
          iconLeading={changeType === "positive" ? TrendUp01 : TrendDown01}
        >
          {change}
        </BadgeWithIcon>
      </div>
    </div>
  );
}
