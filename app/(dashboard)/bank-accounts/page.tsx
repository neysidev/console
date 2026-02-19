import { redirect } from "next/navigation";

export default function BankAccountsPage() {
  redirect("/bank-accounts/local-currency");
}
