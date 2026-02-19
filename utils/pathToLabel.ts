import {
  mainNavItems,
  bankAccountsSection,
  walletNavItems,
  accountNavItems,
  bottomNavItems,
} from "@/constants/navigation";

function buildPathToLabel(): Map<string, string> {
  const map = new Map<string, string>();
  const add = (href: string, label: string) => {
    if (href && !map.has(href)) map.set(href, label);
  };
  mainNavItems.forEach(({ href, label }) => add(href, label));
  add("/bank-accounts", bankAccountsSection.title);
  bankAccountsSection.children.forEach(({ href, label }) => add(href, label));
  walletNavItems.forEach(({ href, label }) => add(href, label));
  accountNavItems.forEach(({ href, label }) => add(href, label));
  bottomNavItems.forEach(({ href, label }) => add(href, label));
  return map;
}

export function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const pathToLabel = buildPathToLabel();
