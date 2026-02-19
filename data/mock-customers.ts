export const CUSTOMER_STATUSES = ["Active", "Inactive", "Lead"] as const;

export type CustomerStatus = (typeof CUSTOMER_STATUSES)[number];

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: CustomerStatus;
  totalOrders: number;
  totalSpent: string;
  lastOrderDate: string | null; // ISO date
  createdAt: string; // ISO date
};

/** Aggregate stats derived from customers (can be computed in real app). */
export function getCustomerStats(customers: Customer[]) {
  const active = customers.filter((c) => c.status === "Active");
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);
  const newThisMonth = customers.filter(
    (c) => new Date(c.createdAt) >= thisMonth
  );
  const totalRevenue = customers.reduce(
    (sum, c) => sum + parseFloat(c.totalSpent.replace(/[^0-9.-]+/g, "")),
    0
  );
  const avgSpent = customers.length > 0 ? totalRevenue / customers.length : 0;

  return {
    totalCustomers: customers.length,
    activeCount: active.length,
    newThisMonth: newThisMonth.length,
    avgCustomerValue: avgSpent,
    totalRevenueChange: "+8.2%",
    customersChange: "+12.4%",
    customersChangeValue: 12.4,
  };
}

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@example.com",
    company: "Acme Inc.",
    status: "Active",
    totalOrders: 12,
    totalSpent: "$2,431.50",
    lastOrderDate: "2025-02-15T14:30:00Z",
    createdAt: "2024-06-12T09:00:00Z",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    email: "phoenix@example.com",
    company: "TechFlow",
    status: "Active",
    totalOrders: 8,
    totalSpent: "$1,245.00",
    lastOrderDate: "2025-02-16T09:15:00Z",
    createdAt: "2024-08-20T11:00:00Z",
  },
  {
    id: "3",
    name: "Lana Steiner",
    email: "lana@example.com",
    company: null,
    status: "Lead",
    totalOrders: 0,
    totalSpent: "$0.00",
    lastOrderDate: null,
    createdAt: "2025-02-01T08:00:00Z",
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    email: "demi@example.com",
    company: "Design Co",
    status: "Active",
    totalOrders: 24,
    totalSpent: "$5,892.30",
    lastOrderDate: "2025-02-18T07:45:00Z",
    createdAt: "2024-03-15T12:00:00Z",
  },
  {
    id: "5",
    name: "Candice Wu",
    email: "candice@example.com",
    company: "StartupXYZ",
    status: "Inactive",
    totalOrders: 3,
    totalSpent: "$456.00",
    lastOrderDate: "2024-11-22T16:20:00Z",
    createdAt: "2024-10-01T14:00:00Z",
  },
  {
    id: "6",
    name: "Natali Craig",
    email: "natali@example.com",
    company: "Global Corp",
    status: "Active",
    totalOrders: 31,
    totalSpent: "$8,120.40",
    lastOrderDate: "2025-02-13T10:00:00Z",
    createdAt: "2024-01-08T09:30:00Z",
  },
  {
    id: "7",
    name: "Drew Cano",
    email: "drew@example.com",
    company: null,
    status: "Lead",
    totalOrders: 0,
    totalSpent: "$0.00",
    lastOrderDate: null,
    createdAt: "2025-02-10T13:22:00Z",
  },
  {
    id: "8",
    name: "Orlando Diggs",
    email: "orlando@example.com",
    company: "Retail Plus",
    status: "Active",
    totalOrders: 5,
    totalSpent: "$1,890.00",
    lastOrderDate: "2025-02-18T07:30:00Z",
    createdAt: "2025-01-20T08:00:00Z",
  },
];
