export const MOCK_STATS = [
  {
    id: "revenue",
    label: "Total revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
  },
  {
    id: "users",
    label: "Active users",
    value: "2,350",
    change: "+180.1%",
    changeType: "positive" as const,
  },
  {
    id: "orders",
    label: "Orders",
    value: "12,234",
    change: "-19%",
    changeType: "negative" as const,
  },
];

export const TEAM_MEMBER_STATUSES = [
  "Admin",
  "Data expert",
  "Data import",
  "Viewer",
  "Editor",
] as const;

export type TeamMemberStatus = (typeof TEAM_MEMBER_STATUSES)[number];

const STATUS_DOT_COLORS: Record<TeamMemberStatus, string> = {
  Admin: "text-utility-error-500",
  "Data expert": "text-utility-brand-500",
  "Data import": "text-utility-blue-500",
  Viewer: "text-utility-gray-500",
  Editor: "text-utility-success-500",
};

export function getStatusDotColor(status: TeamMemberStatus): string {
  return STATUS_DOT_COLORS[status] ?? "text-utility-gray-500";
}

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: TeamMemberStatus;
  lastActive: string; // ISO date
  dateAdded: string; // ISO date
};

// Avatars from https://www.untitledui.com/resources/avatars
export const MOCK_USERS: TeamMember[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@example.com",
    avatar: "https://www.untitledui.com/images/avatars/olivia-rhye",
    status: "Admin",
    lastActive: "2025-01-16T10:30:00Z",
    dateAdded: "2024-11-02T09:00:00Z",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    email: "phoenix@example.com",
    avatar: "https://www.untitledui.com/images/avatars/phoenix-baker",
    status: "Data expert",
    lastActive: "2025-01-15T14:20:00Z",
    dateAdded: "2024-10-15T11:00:00Z",
  },
  {
    id: "3",
    name: "Lana Steiner",
    email: "lana@example.com",
    avatar: "https://www.untitledui.com/images/avatars/lana-steiner",
    status: "Data import",
    lastActive: "2025-01-14T08:00:00Z",
    dateAdded: "2024-12-01T08:00:00Z",
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    email: "demi@example.com",
    avatar: "https://www.untitledui.com/images/avatars/demi-wilkinson",
    status: "Viewer",
    lastActive: "2025-01-16T07:45:00Z",
    dateAdded: "2025-01-05T12:00:00Z",
  },
];

export type SiteTrafficRange = "12m" | "30d" | "7d" | "24h";

export const MOCK_SITE_TRAFFIC_RANGE_LABELS: Record<SiteTrafficRange, string> =
  {
    "12m": "12 months",
    "30d": "30 days",
    "7d": "7 days",
    "24h": "24 hours",
  };

export const MOCK_SITE_TRAFFIC = [
  { month: "Jan", line1: 4200, line2: 3100, line3: 2800 },
  { month: "Feb", line1: 3800, line2: 3400, line3: 2600 },
  { month: "Mar", line1: 4500, line2: 2900, line3: 3200 },
  { month: "Apr", line1: 4100, line2: 3600, line3: 3000 },
  { month: "May", line1: 5200, line2: 4000, line3: 3500 },
  { month: "Jun", line1: 4800, line2: 4200, line3: 3800 },
  { month: "Jul", line1: 5500, line2: 4500, line3: 4100 },
  { month: "Aug", line1: 5100, line2: 4800, line3: 3900 },
  { month: "Sep", line1: 5900, line2: 4600, line3: 4400 },
  { month: "Oct", line1: 6200, line2: 5200, line3: 4700 },
  { month: "Nov", line1: 5800, line2: 5400, line3: 5000 },
  { month: "Dec", line1: 6500, line2: 5600, line3: 5300 },
];
