"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button, Link } from "react-aria-components";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Avatar } from "@/components/ui/Avatar";
import { ArrowRight, SearchMd } from "@untitledui/icons";

const BANDWIDTH_DATA = [
  { date: "Apr 2", daily: 1.2, cumulative: 8.4 },
  { date: "Apr 5", daily: 2.1, cumulative: 14.7 },
  { date: "Apr 8", daily: 1.8, cumulative: 21.6 },
  { date: "Apr 11", daily: 2.4, cumulative: 28.8 },
  { date: "Apr 14", daily: 2.0, cumulative: 36.0 },
  { date: "Apr 17", daily: 2.28, cumulative: 48.6 },
  { date: "Apr 20", daily: 2.5, cumulative: 52.5 },
  { date: "Apr 23", daily: 2.2, cumulative: 58.2 },
  { date: "Apr 26", daily: 2.6, cumulative: 60.2 },
];

const BILLING_HISTORY = [
  {
    id: "1",
    name: "Invoice_March_2025",
    date: "Mar 6, 2025",
    plan: "Basic plan",
  },
  {
    id: "2",
    name: "Invoice_February_2025",
    date: "Feb 6, 2025",
    plan: "Basic plan",
  },
  {
    id: "3",
    name: "Invoice_January_2025",
    date: "Jan 6, 2025",
    plan: "Basic plan",
  },
];

// Seat avatars (Untitled UI style placeholders)
const SEAT_AVATARS = [
  "https://www.untitledui.com/images/avatars/olivia-rhye",
  "https://www.untitledui.com/images/avatars/phoenix-baker",
  "https://www.untitledui.com/images/avatars/lana-steiner",
  "https://www.untitledui.com/images/avatars/demi-wilkinson",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
];

function StripeLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Stripe"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 2.96-1.59 0-.83-.49-1.41-2.24-1.98-2.31-.75-4.73-1.68-4.73-4.73 0-2.77 2.21-4.72 5.63-4.72 2.31 0 4.09.58 5.28 1.4l-.9 4.06c-.9-.58-2.21-1.11-3.57-1.11-.92 0-1.64.32-1.64 1.11 0 .74.58 1.11 2.24 1.69 2.31.74 4.64 1.68 4.64 4.64 0 3.2-2.54 5.16-6.1 5.16-2.54 0-4.55-.79-5.92-1.84l.92-4.2zm-17.12 4.35H38.5l3.2-14.96h4.02l-3.2 14.96zm-.32-6.62c-.13.64-.27 1.31-.4 1.97h-2.85c.13-.66.27-1.33.4-1.97l.4-1.97h2.45l-.4 1.97zm-5.89 6.62l3.2-14.96h4.02l-3.2 14.96h-4.02zm-.32-6.62c-.13.64-.27 1.31-.4 1.97h-2.85c.13-.66.27-1.33.4-1.97l.4-1.97h2.45l-.4 1.97zm-6.3 2.66c.53-2.21 2.24-3.57 4.55-3.57 2.24 0 3.52 1.16 3.52 2.9 0 1.48-.66 2.45-2.24 3.2l-2.45.79c-2.31.74-3.83 2.11-3.83 4.55 0 2.9 2.35 4.72 5.63 4.72 2.24 0 4.02-.58 5.28-1.45l.66 3.2c-1.32.79-3.52 1.45-6.1 1.45-3.57 0-5.89-1.84-5.89-4.88 0-2.24 1.32-3.57 3.52-4.24l2.45-.79c2.31-.74 3.83-1.97 3.83-4.24 0-2.11-1.58-3.31-4.02-3.31-1.9 0-3.52.53-4.55 1.32l-.69-3.2zM9.4 19.63L12.6 4.67h4.02l-3.2 14.96H9.4zm2.24-14.96l-2.9 8.06c-.13.4-.13.66-.13.92 0 1.05.66 1.71 1.71 1.71h1.58l1.32-6.1 1.45-6.59h-4.02z"
        fill="currentColor"
      />
    </svg>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-primary p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function BillingTab() {
  return (
    <div className="space-y-8">
      {/* Premium plan + Payment method row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-primary">
                Premium plan
              </h3>
              <BadgeWithDot type="pill-color" color="success" size="sm">
                Active
              </BadgeWithDot>
            </div>
            <p className="text-xs text-tertiary">
              Our most popular plan for small teams.
            </p>
            <p className="text-xl font-semibold text-primary">$40 per month</p>
            <div>
              <p className="text-xs font-medium text-primary">8 of 10 seats</p>
              <div className="mt-1.5 flex items-center gap-1">
                {SEAT_AVATARS.map((src, i) => (
                  <Avatar
                    key={i}
                    src={src}
                    shape="circle"
                    className="size-7 shrink-0"
                  />
                ))}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-300 text-tertiary text-xs">
                  +
                </span>
              </div>
            </div>
            <Button className="mt-1 inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary shadow-xs outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              Upgrade plan
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-primary">
              Payment method
            </h3>
            <p className="text-xs text-tertiary">
              Set up automated monthly payments.
            </p>
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-secondary p-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-white px-2 text-primary shadow-xs">
                <StripeLogo className="h-5 w-14" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-primary">
                  Stripe Connect
                </p>
                <p className="truncate text-xs text-tertiary">
                  lilyrose@untitledui.com
                </p>
              </div>
            </div>
            <Link
              href="#"
              className="inline-flex w-fit items-center gap-1 text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Go to dashboard
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </Card>
      </div>

      {/* Bandwidth */}
      <Card>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-primary">Bandwidth</h3>
            <span className="text-xs font-medium text-success-600">12%</span>
          </div>
          <p className="text-xs text-tertiary">
            You&apos;ve used 30% of your available bandwidth.
          </p>
          <p className="text-xl font-semibold text-primary">60.2GB of 200GB</p>
          <div className="mt-1.5 h-[200px] min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={BANDWIDTH_DATA}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="bandwidthFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(0 0 0)"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(0 0 0)"
                      stopOpacity={0}
                    />
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
                  tick={{ fontSize: 11, fill: "var(--color-gray-500)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "var(--color-gray-500)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-primary)",
                    border: "1px solid var(--color-gray-200)",
                    borderRadius: "8px",
                    boxShadow: "var(--shadow-md)",
                    fontSize: "11px",
                  }}
                  formatter={(value, name) => [
                    name === "daily" ? `${Number(value)}GB` : Number(value),
                    name === "daily" ? "Daily" : "Cumulative",
                  ]}
                  labelFormatter={() => "April 17, 2025"}
                />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  name="cumulative"
                  stroke="rgb(0 0 0)"
                  strokeWidth={2}
                  fill="url(#bandwidthFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Billing history */}
      <Card>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-primary">
            Billing history
          </h3>
          <Input
            placeholder="Search"
            icon={SearchMd}
            aria-label="Search invoices"
            size="sm"
          />
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[400px] text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-secondary">
                  <th className="w-8 px-3 py-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      aria-label="Select all"
                    />
                  </th>
                  <th className="px-3 py-2 font-medium text-primary">
                    Invoice
                  </th>
                  <th className="px-3 py-2 font-medium text-primary">
                    Billing date
                  </th>
                  <th className="px-3 py-2 font-medium text-primary">Plan</th>
                </tr>
              </thead>
              <tbody>
                {BILLING_HISTORY.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-secondary/50"
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        aria-label={`Select ${row.name}`}
                      />
                    </td>
                    <td className="px-3 py-2 font-medium text-primary">
                      {row.name}
                    </td>
                    <td className="px-3 py-2 text-tertiary">{row.date}</td>
                    <td className="px-3 py-2">
                      <BadgeWithDot type="pill-color" color="success" size="sm">
                        {row.plan}
                      </BadgeWithDot>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
