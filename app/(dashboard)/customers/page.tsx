import { MOCK_CUSTOMERS } from "@/data/mock-customers";
import { CustomersHeader, CustomersStats, CustomersTable } from "./_components";

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <CustomersHeader />
      <CustomersStats customers={MOCK_CUSTOMERS} />
      <CustomersTable customers={MOCK_CUSTOMERS} />
    </div>
  );
}
