"use client";

import { useState } from "react";
import { Button } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

export function SupportForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setIsSubmitting(true);
    try {
      // Placeholder: replace with your API or email endpoint
      await new Promise((r) => setTimeout(r, 800));
      setSubject("");
      setMessage("");
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-gray-200 bg-primary p-8 text-center">
        <p className="text-base font-medium text-primary">
          Thanks, your message has been sent.
        </p>
        <p className="mt-1 text-sm text-tertiary">
          We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          onPress={() => setSubmitted(false)}
          className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-primary p-6 shadow-sm"
    >
      <h2 className="text-base font-semibold text-primary">
        Ask a question
      </h2>
      <p className="mt-1 text-sm text-tertiary">
        Describe your issue or question and we&apos;ll respond as soon as we can.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Input
          label="Subject"
          placeholder="e.g. Billing question, Bug report"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          isRequired
        />

        <div className="flex flex-col gap-1.5">
          <Label isRequired>Message</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue or question in detail..."
            rows={5}
            required
            className={cx(
              "w-full resize-y rounded-lg bg-primary px-3 py-2 text-md text-primary shadow-xs ring-1 ring-primary outline-none transition-shadow duration-100 ease-linear placeholder:text-placeholder",
              "focus:ring-2 focus:ring-brand focus:ring-inset",
              "disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:ring-disabled"
            )}
          />
        </div>

        <Button
          type="submit"
          isDisabled={isSubmitting || !subject.trim() || !message.trim()}
          className="mt-2 inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-4 py-2 text-sm font-medium text-primary outline-none transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
