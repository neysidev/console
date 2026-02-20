"use client";

import { useState } from "react";
import { Button, Link } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { ArrowRight } from "@untitledui/icons";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-primary p-6 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
}

const MASKED_API_KEY = "sk_live_••••••••••••••••••••••••2a4f";

export function ApiTab() {
  const [keyVisible, setKeyVisible] = useState(false);

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">API keys</h3>
          <p className="text-xs text-tertiary">
            Use API keys to authenticate requests. Keep your secret key secure
            and never share it publicly.
          </p>
          <div className="flex flex-col gap-3 max-w-md">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-primary">
                Live secret key
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="API key"
                  defaultValue={MASKED_API_KEY}
                  type={keyVisible ? "text" : "password"}
                  className="font-mono text-xs"
                  aria-label="API key"
                />
                <Button
                  onPress={() => setKeyVisible(!keyVisible)}
                  className="shrink-0 cursor-pointer rounded-lg border border-gray-300 bg-primary px-3 py-2 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
                  aria-label={keyVisible ? "Hide key" : "Reveal key"}
                >
                  {keyVisible ? "Hide" : "Reveal"}
                </Button>
              </div>
            </div>
            <Button className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
              Create new key
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">Webhooks</h3>
          <p className="text-xs text-tertiary">
            Configure endpoints to receive event notifications.
          </p>
          <Input
            label="Webhook URL"
            placeholder="https://api.example.com/webhooks"
            defaultValue=""
          />
          <Button className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
            Save endpoint
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-primary">
            Documentation
          </h3>
          <p className="text-xs text-tertiary">
            Learn how to integrate with our API and explore endpoints.
          </p>
          <Link
            href="#"
            className="inline-flex w-fit items-center gap-1 text-xs font-medium text-primary outline-none hover:underline data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
          >
            API reference
            <ArrowRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </div>
      </Card>
    </div>
  );
}
