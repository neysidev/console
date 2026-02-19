"use client";

import { BeneficiariesTable } from "./BeneficiariesTable";
import { MOCK_BENEFICIARIES } from "@/data/mock-beneficiaries";

export function BeneficiariesContent() {
  return (
    <div className="space-y-8">
      <BeneficiariesTable beneficiaries={MOCK_BENEFICIARIES} />
    </div>
  );
}
