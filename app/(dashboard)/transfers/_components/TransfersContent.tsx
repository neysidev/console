"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "react-aria-components";
import { Plus } from "@untitledui/icons";
import type { Transfer } from "@/data/mock-transfers";
import { MOCK_TRANSFERS } from "@/data/mock-transfers";
import { TransfersHeader } from "./TransfersHeader";
import { TransfersStats } from "./TransfersStats";
import { NewTransferForm } from "./NewTransferForm";
import { TransfersTable } from "./TransfersTable";

export function TransfersContent() {
  const [transfers, setTransfers] = useState<Transfer[]>(MOCK_TRANSFERS);
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNewTransfer = useCallback((transfer: Transfer) => {
    setTransfers((prev) => [transfer, ...prev]);
  }, []);

  return (
    <div className="space-y-8">
      <TransfersHeader
        action={
          <Button
            onPress={scrollToForm}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-xs outline-none transition-colors hover:bg-gray-800 data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
          >
            <Plus className="size-5" />
            New transfer
          </Button>
        }
      />
      <TransfersStats transfers={transfers} />
      <NewTransferForm onSuccess={handleNewTransfer} formRef={formRef} />
      <TransfersTable transfers={transfers} />
    </div>
  );
}
