import { TransactionsHeader, TransactionsContent } from "./_components";

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <TransactionsHeader />
      <TransactionsContent />
    </div>
  );
}
