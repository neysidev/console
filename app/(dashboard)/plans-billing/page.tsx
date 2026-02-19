import { PlansBillingHeader, PlanCards, PreviousInvoices } from "./_components";

export default function PlansBillingPage() {
  return (
    <div className="space-y-8">
      <PlansBillingHeader />
      <PlanCards />
      <PreviousInvoices />
    </div>
  );
}
