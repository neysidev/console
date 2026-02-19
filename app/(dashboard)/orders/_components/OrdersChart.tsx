"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  MOCK_ORDERS_CHART,
  MOCK_ORDERS_CHART_LABELS,
  type OrdersChartRange,
} from "@/data/mock-orders";
import {
  ButtonGroupRoot,
  ButtonGroupItem,
} from "@/components/ui/base/button-group";

const RANGE_OPTIONS: OrdersChartRange[] = ["7d", "30d", "90d"];

export function OrdersChart() {
  const [range, setRange] = useState<OrdersChartRange>("7d");
  const data = MOCK_ORDERS_CHART[range];

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">
            Orders over time
          </h2>
          <p className="mt-0.5 text-sm text-tertiary">
            Order volume and revenue trend
          </p>
        </div>
        <ButtonGroupRoot
          aria-label="Time range"
          selectedKeys={new Set([range])}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            if (key != null) setRange(key as OrdersChartRange);
          }}
        >
          {RANGE_OPTIONS.map((key) => (
            <ButtonGroupItem key={key} id={key}>
              {MOCK_ORDERS_CHART_LABELS[key]}
            </ButtonGroupItem>
          ))}
        </ButtonGroupRoot>
      </div>

      <div className="mt-6 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(0 0 0)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="rgb(0 0 0)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-gray-200)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--color-gray-500)" }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--color-gray-500)" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
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
              formatter={(
                value: number | undefined,
                name: string | undefined
              ) => [
                name === "revenue" ? `$${value ?? 0}` : (value ?? 0),
                name === "revenue" ? "Revenue" : "Orders",
              ]}
              labelFormatter={(label) => label}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="orders"
              name="orders"
              stroke="rgb(0 0 0)"
              strokeWidth={2}
              fill="url(#ordersFill)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              name="revenue"
              stroke="rgb(0 0 0)"
              strokeOpacity={0.5}
              strokeWidth={2}
              fill="rgb(0 0 0)"
              fillOpacity={0.05}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
