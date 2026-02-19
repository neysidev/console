import { MOCK_STATS, MOCK_USERS } from "@/data/mock-dashboard";
import { DashboardHeader, DashboardStats, DashboardTeam } from "./_components";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardStats stats={MOCK_STATS} />
      <DashboardTeam users={MOCK_USERS} />
    </div>
  );
}
