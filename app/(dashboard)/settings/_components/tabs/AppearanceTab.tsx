"use client";

import { useState } from "react";
import { Button, Link } from "react-aria-components";
import { Check } from "@untitledui/icons";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-primary p-6 ${className}`}
    >
      {children}
    </div>
  );
}

const CHART_OPTIONS = [
  {
    id: "default",
    label: "Default",
    description: "Default company branding",
    preview: "line",
  },
  {
    id: "simplified",
    label: "Simplified",
    description: "Minimal and modern",
    preview: "line-simple",
  },
  {
    id: "custom",
    label: "Custom CSS",
    description: "Manage styling with CSS",
    preview: "code",
  },
] as const;

const COOKIE_OPTIONS = [
  {
    id: "default",
    label: "Default",
    description: "Cookie controls for visitors",
  },
  {
    id: "simplified",
    label: "Simplified",
    description: "Show a simplified banner",
  },
  {
    id: "none",
    label: "None",
    description: "Don't show any banners",
  },
] as const;

const LANGUAGES = [
  { value: "en-GB", label: "English (UK)" },
  { value: "en", label: "English (US)" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
] as const;

function OptionCard<T extends string>({
  option,
  isSelected,
  onSelect,
  children,
}: {
  option: { id: T; label: string; description: string };
  isSelected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex w-full flex-col items-start rounded-lg border p-4 text-left outline-none transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isSelected
          ? "border-black bg-gray-50 ring-1 ring-black"
          : "border-gray-200 bg-primary hover:border-gray-300 hover:bg-secondary"
      }`}
    >
      {isSelected && (
        <span className="absolute right-3 top-3 text-black" aria-hidden>
          <Check className="size-5" />
        </span>
      )}
      <span className="text-sm font-medium text-primary">{option.label}</span>
      <span className="mt-0.5 text-xs text-tertiary">{option.description}</span>
      {children}
    </button>
  );
}

export function AppearanceTab() {
  const [brandColor, setBrandColor] = useState("#000000");
  const [chartStyle, setChartStyle] = useState<
    "default" | "simplified" | "custom"
  >("default");
  const [cookieBanner, setCookieBanner] = useState<
    "default" | "simplified" | "none"
  >("default");
  const [language, setLanguage] = useState("en-GB");

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">Brand color</h3>
          <p className="text-xs text-tertiary">
            Select or customize your brand color.
          </p>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded-lg border border-gray-300 bg-primary p-0.5"
              aria-label="Brand color"
            />
            <input
              type="text"
              placeholder="#000000"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="max-w-32 rounded-lg border border-gray-300 bg-primary px-3 py-2 font-mono text-xs text-primary outline-none transition-colors focus:ring-2 focus:ring-primary"
              aria-label="Brand color hex"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">
            Dashboard charts
          </h3>
          <p className="text-xs text-tertiary">How charts are displayed.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {CHART_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={chartStyle === option.id}
                onSelect={() => setChartStyle(option.id)}
              >
                {option.preview === "code" && (
                  <span className="mt-2 flex items-center gap-1 rounded border border-gray-200 bg-secondary px-2 py-1 font-mono text-xs text-tertiary">
                    {"<>"} Edit CSS
                  </span>
                )}
              </OptionCard>
            ))}
          </div>
          <Link
            href="#"
            className="text-xs font-medium text-primary outline-none hover:underline data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
          >
            View examples
          </Link>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">Language</h3>
          <p className="text-xs text-tertiary">
            Default language for public dashboard.
          </p>
          <div className="max-w-xs">
            <label className="text-xs font-medium text-primary">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-300 bg-primary px-3 py-2 text-sm text-primary outline-none transition-colors focus:ring-2 focus:ring-primary"
              aria-label="Language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-primary">
            Cookie banner
          </h3>
          <p className="text-xs text-tertiary">
            Display cookie banners to visitors.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {COOKIE_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={cookieBanner === option.id}
                onSelect={() => setCookieBanner(option.id)}
              />
            ))}
          </div>
          <Link
            href="#"
            className="text-xs font-medium text-primary outline-none hover:underline data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2"
          >
            View examples
          </Link>
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-primary px-3 py-1.5 text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
          Cancel
        </Button>
        <Button className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-black bg-black px-3 py-1.5 text-xs font-medium text-white outline-none transition-colors hover:bg-gray-800 data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2">
          Save changes
        </Button>
      </div>
    </div>
  );
}
