export type Beneficiary = {
  id: string;
  name: string;
  bankName: string;
  iban: string;
  bic?: string;
  currency: string;
  lastUsed?: string;
  email?: string;
};

export const MOCK_BENEFICIARIES: Beneficiary[] = [
  {
    id: "ben-1",
    name: "Acme Corp",
    bankName: "Global Business Bank",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "COBADEFFXXX",
    currency: "EUR",
    lastUsed: "2025-02-17T09:15:00Z",
  },
  {
    id: "ben-2",
    name: "Jane Doe",
    bankName: "Euro Bank SA",
    iban: "FR76 9876 5432 1098 7654 3210 123",
    currency: "EUR",
    lastUsed: "2025-02-19T10:30:00Z",
  },
  {
    id: "ben-3",
    name: "Tech Supplies Ltd",
    bankName: "First National",
    iban: "US98 7654 3210 9876 5432 1098 765",
    currency: "USD",
    lastUsed: "2025-02-10T14:00:00Z",
  },
];
