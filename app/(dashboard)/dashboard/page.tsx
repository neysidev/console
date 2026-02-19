import Image from "next/image";
import {
  CreditCard01,
  Users01,
  ShoppingCart01,
  TrendUp01,
  TrendDown01,
} from "@untitledui/icons";
import { MOCK_STATS, MOCK_USERS } from "@/data/mock-dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
          Dashboard
        </h1>
        <p className="mt-1 text-base text-[var(--color-text-secondary)]">
          Welcome to Console. Here’s what’s happening with your project.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_STATS.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-6 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-bg-brand-primary)] text-[var(--color-fg-brand-primary)]">
                {stat.id === "revenue" && <CreditCard01 className="size-5" />}
                {stat.id === "users" && <Users01 className="size-5" />}
                {stat.id === "orders" && <ShoppingCart01 className="size-5" />}
              </span>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {stat.label}
              </span>
            </div>
            <p className="mt-4 text-xl font-semibold text-[var(--color-text-primary)]">
              {stat.value}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              {stat.changeType === "positive" ? (
                <TrendUp01 className="size-4 text-[var(--color-fg-success-primary)]" />
              ) : (
                <TrendDown01 className="size-4 text-[var(--color-fg-error-primary)]" />
              )}
              <span
                className={
                  stat.changeType === "positive"
                    ? "text-sm font-medium text-[var(--color-text-success-primary)]"
                    : "text-sm font-medium text-[var(--color-text-error-primary)]"
                }
              >
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Team
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Fake users (mock data only).
        </p>
        <ul className="mt-4 divide-y divide-[var(--color-border-secondary)] rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
          {MOCK_USERS.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-4 px-4 py-3 first:rounded-t-xl last:rounded-b-xl"
            >
              <Image
                src={user.avatar}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full bg-[var(--color-avatar-bg)] object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                  {user.name}
                </p>
                <p className="truncate text-sm text-[var(--color-text-tertiary)]">
                  {user.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
