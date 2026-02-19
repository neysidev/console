export type WalletBalanceByCurrency = {
  currency: string;
  symbol: string;
  available: number;
  pending: number;
};

export const MOCK_WALLET_TOTAL = {
  available: 12450.75,
  pending: 850.0,
};

export const MOCK_WALLET_BALANCES: WalletBalanceByCurrency[] = [
  { currency: "USD", symbol: "$", available: 8240.5, pending: 500 },
  { currency: "EUR", symbol: "€", available: 3120.25, pending: 200 },
  { currency: "GBP", symbol: "£", available: 1090.0, pending: 150 },
];

export const MOCK_LINKED_COUNTS = {
  bankAccounts: 3,
  cards: 3,
};
