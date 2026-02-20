"use client";

import { useState } from "react";
import { FilterLines } from "@untitledui/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  MOCK_SITE_TRAFFIC,
  MOCK_SITE_TRAFFIC_RANGE_LABELS,
  type SiteTrafficRange,
} from "@/data/mock-dashboard";
import {
  ButtonGroupRoot,
  ButtonGroupItem,
} from "@/components/ui/base/button-group";

const RANGE_OPTIONS: SiteTrafficRange[] = ["12m", "30d", "7d", "24h"];

export function SiteTraffic() {
  const [range, setRange] = useState<SiteTrafficRange>("12m");

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-primary dark:text-white">
            Site traffic
          </h2>
          <span className="text-sm font-medium text-utility-success-600">
            +104%
          </span>
        </div>

        {/* Filters: button group (Untitled UI style) + filter button */}
        <div className="flex items-center gap-2">
          <ButtonGroupRoot
            aria-label="Time range"
            selectedKeys={new Set([range])}
            className="dark:bg-gray-900 dark:text-gray-500 dark:border-gray-800"
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0];
              if (key != null) setRange(key as SiteTrafficRange);
            }}
          >
            {RANGE_OPTIONS.map((key) => (
              <ButtonGroupItem
                key={key}
                id={key}
                className="dark:bg-gray-900 dark:text-gray-500 dark:hover:bg-black dark:hover:text-white"
              >
                {MOCK_SITE_TRAFFIC_RANGE_LABELS[key]}
              </ButtonGroupItem>
            ))}
          </ButtonGroupRoot>
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-primary px-3 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500 dark:hover:bg-gray-800"
            aria-label="Open filters"
          >
            <FilterLines className="size-5 text-gray-500 dark:text-white" />
            Filter
          </button>
        </div>
      </div>

      {/* Line chart - 3 lines, black style with opacity */}
      <div className="mt-6 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={MOCK_SITE_TRAFFIC}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-gray-200)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--color-gray-500)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--color-gray-500)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-bg-primary)",
                border: "1px solid var(--color-gray-200)",
                borderRadius: "8px",
                boxShadow: "var(--shadow-md)",
                fontSize: "12px",
              }}
              labelStyle={{ color: "var(--color-gray-700)" }}
            />
            <Line
              type="monotone"
              dataKey="line1"
              name="Traffic 1"
              stroke="rgb(0 0 0)"
              strokeOpacity={1}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="line2"
              name="Traffic 2"
              stroke="rgb(0 0 0)"
              strokeOpacity={0.6}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="line3"
              name="Traffic 3"
              stroke="rgb(0 0 0)"
              strokeOpacity={0.3}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
