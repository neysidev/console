import { TeamMember } from "./TeamMember";
import type { MOCK_USERS } from "@/data/mock-dashboard";

type UserItem = (typeof MOCK_USERS)[number];

type DashboardTeamProps = {
  users: UserItem[];
};

export function DashboardTeam({ users }: DashboardTeamProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-primary">Team</h2>
      <p className="mt-1 text-sm text-gray-700">Fake users (mock data only).</p>
      <ul className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-primary">
        {users.map((user) => (
          <TeamMember
            key={user.id}
            name={user.name}
            email={user.email}
            avatar={user.avatar}
          />
        ))}
      </ul>
    </section>
  );
}
