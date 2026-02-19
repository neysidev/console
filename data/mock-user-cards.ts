/**
 * Current user's payment cards (mock).
 * Cardholder matches the user shown in My Account (Olivia Rhye).
 */

export type UserCardType =
  | "brand-dark"
  | "brand-light"
  | "gray-dark"
  | "gray-light"
  | "transparent"
  | "transparent-gradient"
  | "transparent-strip"
  | "gray-strip"
  | "gradient-strip"
  | "salmon-strip"
  | "gray-strip-vertical"
  | "gradient-strip-vertical"
  | "salmon-strip-vertical";

export type UserCard = {
  id: string;
  /** Last 4 digits (displayed; full number used for card visual) */
  lastFour: string;
  /** Full number for the card visual only */
  cardNumber: string;
  cardHolder: string;
  cardExpiration: string;
  type: UserCardType;
  /** e.g. "Primary", "Personal", "Business" */
  label: string;
  company: string;
};

/** The 3 cards belonging to the current user (Olivia Rhye). */
export const CURRENT_USER_CARDS: UserCard[] = [
  {
    id: "card-1",
    lastFour: "4242",
    cardNumber: "4242 4242 4242 4242",
    cardHolder: "OLIVIA RHYE",
    cardExpiration: "06/28",
    type: "brand-dark",
    label: "Primary",
    company: "Untitled.",
  },
  {
    id: "card-2",
    lastFour: "5554",
    cardNumber: "5555 5555 5555 5554",
    cardHolder: "OLIVIA RHYE",
    cardExpiration: "12/27",
    type: "gray-dark",
    label: "Personal",
    company: "Untitled.",
  },
  {
    id: "card-3",
    lastFour: "0005",
    cardNumber: "3782 822463 10005",
    cardHolder: "OLIVIA RHYE",
    cardExpiration: "09/29",
    type: "brand-light",
    label: "Business",
    company: "Untitled.",
  },
];
