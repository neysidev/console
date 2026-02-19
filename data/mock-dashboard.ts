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

export const MOCK_USERS = [
  {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    email: "phoenix@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phoenix",
  },
  {
    id: "3",
    name: "Lana Steiner",
    email: "lana@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lana",
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    email: "demi@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demi",
  },
];
