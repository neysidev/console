"use client";

import Link from "next/link";
import {
  BookOpen01,
  Code01,
  FileCheck02,
  ArrowUpRight,
  Zap,
  Shield01,
} from "@untitledui/icons";

const DOC_SECTIONS = [
  {
    title: "Getting started",
    description:
      "Set up your account, connect your first bank, and make your first transfer.",
    href: "#",
    icon: Zap,
  },
  {
    title: "API reference",
    description:
      "REST and webhook documentation for integrating with our platform.",
    href: "#",
    icon: Code01,
  },
  {
    title: "Guides & tutorials",
    description: "Step-by-step guides for common workflows and use cases.",
    href: "#",
    icon: BookOpen01,
  },
  {
    title: "Compliance & security",
    description:
      "Security practices, compliance requirements, and best practices.",
    href: "#",
    icon: Shield01,
  },
  {
    title: "Changelog",
    description: "Release notes and updates to the platform and API.",
    href: "#",
    icon: FileCheck02,
  },
];

function DocCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-gray-200 bg-primary p-6 text-left transition-colors hover:border-gray-300 hover:bg-secondary focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
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
    </Link>
  );
}

export function DocumentationContent() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {DOC_SECTIONS.map((section) => (
          <DocCard key={section.title} {...section} />
        ))}
      </div>
    </div>
  );
}
