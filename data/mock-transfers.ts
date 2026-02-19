export const TRANSFER_STATUSES = [
  "Completed",
  "Pending",
  "Processing",
  "Failed",
  "Cancelled",
] as const;

export type TransferStatus = (typeof TRANSFER_STATUSES)[number];

export type Transfer = {
  id: string;
  reference: string;
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: string;
  status: TransferStatus;
  date: string;
  note?: string;
};

/** Account options for from/to dropdowns (mock). */
export const MOCK_ACCOUNTS = [
  { id: "wallet", label: "Wallet (Main)", lastFour: "WALT" },
  { id: "local-eur", label: "Local EUR •••• 3842", lastFour: "3842" },
  { id: "local-usd", label: "Local USD •••• 2910", lastFour: "2910" },
  { id: "foreign-gbp", label: "Foreign GBP •••• 5543", lastFour: "5543" },
  { id: "beneficiary-1", label: "Acme Corp (Beneficiary)", lastFour: "" },
  { id: "beneficiary-2", label: "Jane Doe (Beneficiary)", lastFour: "" },
] as const;

/** Aggregate stats derived from transfers. */
export function getTransferStats(transfers: Transfer[]) {
  const completed = transfers.filter((t) => t.status === "Completed");
  const pending = transfers.filter(
    (t) => t.status === "Pending" || t.status === "Processing"
  );
  const failed = transfers.filter((t) => t.status === "Failed");
  const amounts = completed.map((t) =>
    parseFloat(t.amount.replace(/[^0-9.-]+/g, ""))
  );
  const totalSent = amounts.reduce((a, b) => a + b, 0);
  const thisMonth = completed.filter((t) => {
    const d = new Date(t.date);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const thisMonthAmount = thisMonth.reduce(
    (sum, t) => sum + parseFloat(t.amount.replace(/[^0-9.-]+/g, "")),
    0
  );

  return {
    totalTransfers: transfers.length,
    completedCount: completed.length,
    pendingCount: pending.length,
    failedCount: failed.length,
    totalSent,
    totalSentFormatted: `$${totalSent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    sentThisMonth: thisMonthAmount,
    sentThisMonthFormatted: `$${thisMonthAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    sentChange: "+5.2%",
    sentChangeValue: 5.2,
  };
}

export const MOCK_TRANSFERS: Transfer[] = [
  {
    id: "1",
    reference: "TRF-8842",
    fromAccount: "Wallet (Main)",
    toAccount: "Local EUR •••• 3842",
    amount: "$2,500.00",
    currency: "USD",
    status: "Completed",
    date: "2025-02-18T14:22:00Z",
    note: "Monthly savings",
  },
  {
    id: "2",
    reference: "TRF-8841",
    fromAccount: "Local USD •••• 2910",
    toAccount: "Acme Corp (Beneficiary)",
    amount: "$1,200.00",
    currency: "USD",
    status: "Completed",
    date: "2025-02-17T09:15:00Z",
  },
  {
    id: "3",
    reference: "TRF-8840",
    fromAccount: "Wallet (Main)",
    toAccount: "Foreign GBP •••• 5543",
    amount: "£850.00",
    currency: "GBP",
    status: "Processing",
    date: "2025-02-19T08:00:00Z",
  },
  {
    id: "4",
    reference: "TRF-8839",
    fromAccount: "Local EUR •••• 3842",
    toAccount: "Jane Doe (Beneficiary)",
    amount: "€420.00",
    currency: "EUR",
    status: "Pending",
    date: "2025-02-19T10:30:00Z",
  },
  {
    id: "5",
    reference: "TRF-8838",
    fromAccount: "Wallet (Main)",
    toAccount: "Local USD •••• 2910",
    amount: "$500.00",
    currency: "USD",
    status: "Failed",
    date: "2025-02-16T16:45:00Z",
    note: "Insufficient funds",
  },
  {
    id: "6",
    reference: "TRF-8837",
    fromAccount: "Foreign GBP •••• 5543",
    toAccount: "Wallet (Main)",
    amount: "£200.00",
    currency: "GBP",
    status: "Completed",
    date: "2025-02-15T11:20:00Z",
  },
  {
    id: "7",
    reference: "TRF-8836",
    fromAccount: "Local USD •••• 2910",
    toAccount: "Wallet (Main)",
    amount: "$3,000.00",
    currency: "USD",
    status: "Completed",
    date: "2025-02-14T13:00:00Z",
  },
  {
    id: "8",
    reference: "TRF-8835",
    fromAccount: "Wallet (Main)",
    toAccount: "Local EUR •••• 3842",
    amount: "€1,050.00",
    currency: "EUR",
    status: "Cancelled",
    date: "2025-02-13T09:00:00Z",
  },
];
