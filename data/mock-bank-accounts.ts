export type LocalCurrencyAccount = {
  id: string;
  bankName: string;
  accountName: string;
  iban: string;
  lastFour: string;
  currency: string;
  balance: number;
  available: number;
  pending?: number;
  sortCode?: string;
};

export type ForeignCurrencyAccount = {
  id: string;
  bankName: string;
  accountName: string;
  iban: string;
  lastFour: string;
  currency: string;
  balance: number;
  available: number;
  /** Rate to USD for display */
  rateToUsd: number;
  balanceUsd: number;
};

export const MOCK_LOCAL_ACCOUNTS: LocalCurrencyAccount[] = [
  {
    id: "local-eur",
    bankName: "Euro Bank SA",
    accountName: "Main EUR",
    iban: "FR76 1234 5678 9012 3456 7890 384",
    lastFour: "3842",
    currency: "EUR",
    balance: 3320.25,
    available: 3120.25,
    pending: 200,
    sortCode: "12-34-56",
  },
  {
    id: "local-usd",
    bankName: "First National",
    accountName: "Checking USD",
    iban: "US12 3456 7890 1234 5678 9012 291",
    lastFour: "2910",
    currency: "USD",
    balance: 8740.5,
    available: 8240.5,
    pending: 500,
  },
];

export const MOCK_FOREIGN_ACCOUNTS: ForeignCurrencyAccount[] = [
  {
    id: "foreign-gbp",
    bankName: "UK Commerce Bank",
    accountName: "GBP Savings",
    iban: "GB82 WEST 1234 5698 7654 32",
    lastFour: "5543",
    currency: "GBP",
    balance: 1240.0,
    available: 1090.0,
    rateToUsd: 1.27,
    balanceUsd: 1574.8,
  },
  {
    id: "foreign-chf",
    bankName: "Swiss Global",
    accountName: "CHF Account",
    iban: "CH93 0076 2011 6238 5295 7",
    lastFour: "2957",
    currency: "CHF",
    balance: 4500.0,
    available: 4500.0,
    rateToUsd: 1.13,
    balanceUsd: 5085.0,
  },
];

export const MOCK_EXCHANGE_RATES = [
  { currency: "EUR", rate: 1.08, change: 0.2 },
  { currency: "GBP", rate: 1.27, change: -0.1 },
  { currency: "CHF", rate: 1.13, change: 0.05 },
  { currency: "JPY", rate: 0.0067, change: 0.0 },
];
