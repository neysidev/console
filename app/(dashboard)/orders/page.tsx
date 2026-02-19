import { MOCK_ORDERS } from "@/data/mock-orders";
import {
  OrdersChart,
  OrdersHeader,
  OrdersStats,
  OrdersTable,
} from "./_components";

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <OrdersHeader />
      <OrdersStats orders={MOCK_ORDERS} />
      <OrdersChart />
      <OrdersTable orders={MOCK_ORDERS} />
    </div>
  );
}
