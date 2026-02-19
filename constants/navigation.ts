import {
  Bank,
  BookOpen01,
  Coins03,
  CreditCard02,
  File06,
  HelpCircle,
  Home01,
  Rocket01,
  Settings01,
  SwitchHorizontal01,
  User01,
  Users01,
  Wallet01,
} from "@untitledui/icons";

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }> | null;
};

export type NavGroup = NavItem[];

export type NavSectionConfig = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: NavItem[];
};

export const mainNavItems: NavGroup = [
  { href: "/dashboard", label: "Dashboard", icon: Home01 },
  { href: "/orders", label: "Orders", icon: Coins03 },
  { href: "/customers", label: "Customers", icon: Users01 },
];

export const bankAccountsSection: NavSectionConfig = {
  title: "Bank accounts",
  icon: Bank,
  children: [
    { href: "/bank-accounts/local-currency", label: "Local currency" },
    { href: "/bank-accounts/foreign-currency", label: "Foreign currency" },
    { href: "/bank-accounts/beneficiaries", label: "Beneficiaries" },
    { href: "/bank-accounts/transactions", label: "Transactions" },
  ],
};

export const walletNavItems: NavGroup = [
  { href: "/wallet", label: "Wallet", icon: Wallet01 },
  { href: "/transfers", label: "Transfers", icon: SwitchHorizontal01 },
  { href: "/cards", label: "Cards", icon: CreditCard02 },
];

export const accountNavItems: NavGroup = [
  { href: "/my-account", label: "My account", icon: User01 },
  { href: "/plans-billing", label: "Plans & billing", icon: File06 },
  { href: "/upgrade-pro", label: "Upgrade to PRO", icon: Rocket01 },
  { href: "/documentation", label: "Documentation", icon: BookOpen01 },
];

export const bottomNavItems: NavGroup = [
  { href: "/support", label: "Support", icon: HelpCircle },
  { href: "/settings", label: "Settings", icon: Settings01 },
];
