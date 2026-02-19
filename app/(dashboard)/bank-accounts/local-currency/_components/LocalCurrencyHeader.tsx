import Link from "next/link";
import { Plus } from "@untitledui/icons";

export function LocalCurrencyHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          Local currency
        </h1>
        <p className="mt-1 text-sm text-tertiary">
          Manage your local currency bank accounts and balances.
        </p>
      </div>
      <Link
        href="/transfers"
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-xs outline-none transition-colors hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Plus className="size-5" />
        Add account
      </Link>
    </div>
  );
}
