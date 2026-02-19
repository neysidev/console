export const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  amount: string;
  date: string; // ISO date
};

/** Aggregate stats derived from orders (can be computed in real app). */
export function getOrderStats(orders: Order[]) {
  const delivered = orders.filter((o) => o.status === "Delivered");
  const pending = orders.filter(
    (o) => o.status === "Pending" || o.status === "Processing"
  );
  const amounts = orders
    .filter((o) => o.status !== "Cancelled")
    .map((o) => parseFloat(o.amount.replace(/[^0-9.-]+/g, "")));
  const totalRevenue = amounts.reduce((a, b) => a + b, 0);
  const avgOrder = amounts.length ? totalRevenue / amounts.length : 0;
  return {
    totalRevenue,
    totalOrders: orders.length,
    pendingCount: pending.length,
    avgOrderValue: avgOrder,
    revenueChange: "+12.5%",
    revenueChangeValue: 12.5,
    ordersChange: "+8.2%",
    ordersChangeValue: 8.2,
  };
}

export type OrdersChartRange = "7d" | "30d" | "90d";

export const MOCK_ORDERS_CHART_LABELS: Record<OrdersChartRange, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

/** Orders count per period for chart (last 7, 30, or 90 days). */
export const MOCK_ORDERS_CHART: Record<
  OrdersChartRange,
  { date: string; orders: number; revenue: number }[]
> = {
  "7d": [
    { date: "Feb 13", orders: 4, revenue: 520 },
    { date: "Feb 14", orders: 7, revenue: 890 },
    { date: "Feb 15", orders: 5, revenue: 640 },
    { date: "Feb 16", orders: 9, revenue: 1120 },
    { date: "Feb 17", orders: 6, revenue: 780 },
    { date: "Feb 18", orders: 8, revenue: 950 },
    { date: "Feb 19", orders: 12, revenue: 1450 },
  ],
  "30d": [
    { date: "Jan 21", orders: 8, revenue: 920 },
    { date: "Jan 28", orders: 14, revenue: 1680 },
    { date: "Feb 4", orders: 11, revenue: 1340 },
    { date: "Feb 11", orders: 18, revenue: 2100 },
    { date: "Feb 18", orders: 22, revenue: 2650 },
  ],
  "90d": [
    { date: "Nov", orders: 42, revenue: 5200 },
    { date: "Dec", orders: 58, revenue: 7200 },
    { date: "Jan", orders: 71, revenue: 8900 },
    { date: "Feb", orders: 38, revenue: 4800 },
  ],
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "#ORD-7842",
    customerName: "Olivia Rhye",
    customerEmail: "olivia@example.com",
    status: "Delivered",
    amount: "$142.50",
    date: "2025-02-15T14:30:00Z",
  },
  {
    id: "2",
    orderNumber: "#ORD-7841",
    customerName: "Phoenix Baker",
    customerEmail: "phoenix@example.com",
    status: "Shipped",
    amount: "$89.00",
    date: "2025-02-16T09:15:00Z",
  },
  {
    id: "3",
    orderNumber: "#ORD-7840",
    customerName: "Lana Steiner",
    customerEmail: "lana@example.com",
    status: "Processing",
    amount: "$256.75",
    date: "2025-02-17T11:00:00Z",
  },
  {
    id: "4",
    orderNumber: "#ORD-7839",
    customerName: "Demi Wilkinson",
    customerEmail: "demi@example.com",
    status: "Pending",
    amount: "$54.25",
    date: "2025-02-18T08:45:00Z",
  },
  {
    id: "5",
    orderNumber: "#ORD-7838",
    customerName: "Candice Wu",
    customerEmail: "candice@example.com",
    status: "Cancelled",
    amount: "$198.00",
    date: "2025-02-14T16:20:00Z",
  },
  {
    id: "6",
    orderNumber: "#ORD-7837",
    customerName: "Natali Craig",
    customerEmail: "natali@example.com",
    status: "Delivered",
    amount: "$312.40",
    date: "2025-02-13T10:00:00Z",
  },
  {
    id: "7",
    orderNumber: "#ORD-7836",
    customerName: "Drew Cano",
    customerEmail: "drew@example.com",
    status: "Shipped",
    amount: "$67.80",
    date: "2025-02-17T13:22:00Z",
  },
  {
    id: "8",
    orderNumber: "#ORD-7835",
    customerName: "Orlando Diggs",
    customerEmail: "orlando@example.com",
    status: "Pending",
    amount: "$425.00",
    date: "2025-02-18T07:30:00Z",
  },
];
