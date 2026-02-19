export const BANK_TRANSACTION_TYPES = [
  "Credit",
  "Debit",
  "Transfer In",
  "Transfer Out",
  "Fee",
  "Interest",
] as const;

export type BankTransactionType = (typeof BANK_TRANSACTION_TYPES)[number];

export type BankTransaction = {
  id: string;
  date: string;
  description: string;
  accountId: string;
  accountLabel: string;
  type: BankTransactionType;
  amount: number;
  currency: string;
  balanceAfter: number;
  reference?: string;
};

export const MOCK_BANK_TRANSACTIONS: BankTransaction[] = [
  {
    id: "bt-1",
    date: "2025-02-19T10:30:00Z",
    description: "Transfer to Jane Doe",
    accountId: "local-eur",
    accountLabel: "Main EUR •••• 3842",
    type: "Transfer Out",
    amount: -420,
    currency: "EUR",
    balanceAfter: 3320.25,
    reference: "TRF-8839",
  },
  {
    id: "bt-2",
    date: "2025-02-19T08:00:00Z",
    description: "Salary deposit",
    accountId: "local-usd",
    accountLabel: "Checking USD •••• 2910",
    type: "Credit",
    amount: 3500,
    currency: "USD",
    balanceAfter: 8740.5,
  },
  {
    id: "bt-3",
    date: "2025-02-18T14:22:00Z",
    description: "Transfer from Wallet",
    accountId: "local-eur",
    accountLabel: "Main EUR •••• 3842",
    type: "Transfer In",
    amount: 2500,
    currency: "EUR",
    balanceAfter: 3740.25,
    reference: "TRF-8842",
  },
  {
    id: "bt-4",
    date: "2025-02-18T11:00:00Z",
    description: "Monthly account fee",
    accountId: "local-usd",
    accountLabel: "Checking USD •••• 2910",
    type: "Fee",
    amount: -5,
    currency: "USD",
    balanceAfter: 5240.5,
  },
  {
    id: "bt-5",
    date: "2025-02-17T09:15:00Z",
    description: "Payment to Acme Corp",
    accountId: "local-usd",
    accountLabel: "Checking USD •••• 2910",
    type: "Transfer Out",
    amount: -1200,
    currency: "USD",
    balanceAfter: 5245.5,
    reference: "TRF-8841",
  },
  {
    id: "bt-6",
    date: "2025-02-16T16:45:00Z",
    description: "Interest credit",
    accountId: "foreign-gbp",
    accountLabel: "GBP Savings •••• 5543",
    type: "Interest",
    amount: 12.5,
    currency: "GBP",
    balanceAfter: 1240.0,
  },
  {
    id: "bt-7",
    date: "2025-02-15T11:20:00Z",
    description: "Transfer to Wallet",
    accountId: "foreign-gbp",
    accountLabel: "GBP Savings •••• 5543",
    type: "Transfer Out",
    amount: -200,
    currency: "GBP",
    balanceAfter: 1227.5,
    reference: "TRF-8837",
  },
  {
    id: "bt-8",
    date: "2025-02-14T13:00:00Z",
    description: "Deposit",
    accountId: "local-usd",
    accountLabel: "Checking USD •••• 2910",
    type: "Credit",
    amount: 3000,
    currency: "USD",
    balanceAfter: 6445.5,
  },
];
