"use client";

import Link from "next/link";
import {
  BookOpen01,
  Mail01,
  MessageChatCircle,
  ArrowUpRight,
} from "@untitledui/icons";

const SUPPORT_OPTIONS = [
  {
    title: "Email support",
    description: "Reach out to our team and we’ll respond within 24 hours.",
    href: "mailto:support@example.com",
    icon: Mail01,
    external: true,
  },
  {
    title: "Live chat",
    description: "Chat with support for quick answers during business hours.",
    href: "#",
    icon: MessageChatCircle,
    external: false,
  },
  {
    title: "Documentation",
    description: "Guides, API references, and troubleshooting articles.",
    href: "/documentation",
    icon: BookOpen01,
    external: false,
  },
];

function SupportCard({
  title,
  description,
  href,
  icon: Icon,
  external,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-primary">
        <Icon className="size-5 text-secondary" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-semibold text-primary">{title}</h2>
        <p className="mt-1 text-sm text-tertiary">{description}</p>
      </div>
      <ArrowUpRight className="size-5 shrink-0 text-tertiary" aria-hidden />
    </div>
  );

  const className =
    "block rounded-xl border border-gray-200 bg-primary p-6 text-left transition-colors hover:border-gray-300 hover:bg-secondary focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function SupportContent() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SUPPORT_OPTIONS.map((option) => (
        <SupportCard key={option.title} {...option} />
      ))}
    </div>
  );
}
