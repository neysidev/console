"use client";

import { TrendUp01, TrendDown01 } from "@untitledui/icons";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { BadgeWithIcon } from "@/components/ui/base/badges/badges";

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
};

function parseStatValue(value: string): {
  num: number;
  format: "currency" | "integer" | "decimal";
} {
  const cleaned = value.replace(/[^0-9.-]/g, "");
  const num = parseFloat(cleaned) || 0;
  if (value.startsWith("$") || value.includes("€") || value.includes("£")) {
    return { num, format: "currency" };
  }
  if (Number.isInteger(num) && cleaned === String(Math.round(num))) {
    return { num, format: "integer" };
  }
  return { num, format: "decimal" };
}

function parsePercent(str: string): number | null {
  const m = str.match(/[+-]?[\d.]+/);
  return m ? parseFloat(m[0]) : null;
}

export function StatCard({ label, value, change, changeType }: StatCardProps) {
  const { num, format } = parseStatValue(value);
  const changeNum = parsePercent(change);

  return (
    <div className="rounded-xl border border-gray-200 bg-primary p-4 shadow-xs">
      <h3 className="text-xs font-medium text-gray-700">{label}</h3>

      <div className="flex items-end justify-between">
        <div className="mt-4 text-xl font-semibold text-primary">
          {format === "currency" ? (
            <AnimatedNumber
              value={num}
              format="currency"
              currency="USD"
              className="inline"
            />
          ) : (
            <AnimatedNumber value={num} format={format} className="inline" />
          )}
        </div>
        <BadgeWithIcon
          size="sm"
          type="color"
          color={changeType === "positive" ? "success" : "error"}
          iconLeading={changeType === "positive" ? TrendUp01 : TrendDown01}
        >
          {changeNum != null ? (
            <span className="inline">
              {changeNum >= 0 ? "+" : ""}
              <AnimatedNumber
                value={Math.abs(changeNum) / 100}
                format="percent"
                className="inline"
              />
            </span>
          ) : (
            change
          )}
        </BadgeWithIcon>
      </div>
    </div>
  );
}
