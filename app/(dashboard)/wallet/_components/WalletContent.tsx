"use client";

import Link from "next/link";
import { Plus } from "@untitledui/icons";
import { WalletHeader } from "./WalletHeader";
import { WalletBalanceCard } from "./WalletBalanceCard";
import { WalletQuickActions } from "./WalletQuickActions";
import { WalletBalanceByCurrency } from "./WalletBalanceByCurrency";
import { WalletRecentActivity } from "./WalletRecentActivity";
import { WalletLinked } from "./WalletLinked";

export function WalletContent() {
  return (
    <div className="space-y-8">
      <WalletBalanceCard />
      <WalletQuickActions />
      <div className="grid gap-8 lg:grid-cols-2">
        <WalletBalanceByCurrency />
        <WalletLinked />
      </div>
      <WalletRecentActivity />
    </div>
  );
}
