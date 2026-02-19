"use client";

import { StatCard } from "./StatCard";
import type { MOCK_STATS } from "@/data/mock-dashboard";

type StatItem = (typeof MOCK_STATS)[number];

type DashboardStatsProps = {
  stats: StatItem[];
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </section>
  );
}
