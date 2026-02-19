import type { ReactNode } from "react";

type TransfersHeaderProps = {
  action?: ReactNode;
};

export function TransfersHeader({ action }: TransfersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          Transfers
        </h1>
        <p className="mt-1 text-sm text-tertiary">
          Send and receive money between your accounts. Create new transfers or
          view and filter history below.
        </p>
      </div>
      {action}
    </div>
  );
}
