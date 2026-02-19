"use client";

import NumberFlow, { type Format } from "@number-flow/react";

type AnimatedNumberFormat = "currency" | "integer" | "decimal" | "percent";

type AnimatedNumberProps = {
  value: number;
  format?: AnimatedNumberFormat;
  currency?: string;
  prefix?: string;
  suffix?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  className?: string;
};

function getFormatOptions(
  format: AnimatedNumberFormat,
  opts: {
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): Format {
  const {
    currency = "USD",
    minimumFractionDigits,
    maximumFractionDigits,
  } = opts;
  switch (format) {
    case "currency":
      return {
        style: "currency",
        currency,
        minimumFractionDigits: minimumFractionDigits ?? 2,
        maximumFractionDigits: maximumFractionDigits ?? 2,
        trailingZeroDisplay: "stripIfInteger",
      } as Format;
    case "percent":
      return {
        style: "percent",
        minimumFractionDigits: minimumFractionDigits ?? 1,
        maximumFractionDigits: maximumFractionDigits ?? 1,
      } as Format;
    case "integer":
      return { maximumFractionDigits: 0 } as Format;
    case "decimal":
    default:
      return {
        minimumFractionDigits: minimumFractionDigits ?? 0,
        maximumFractionDigits: maximumFractionDigits ?? 2,
      } as Format;
  }
}

export function AnimatedNumber({
  value,
  format = "decimal",
  currency,
  prefix,
  suffix,
  minimumFractionDigits,
  maximumFractionDigits,
  className,
}: AnimatedNumberProps) {
  const formatOptions = getFormatOptions(format, {
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <NumberFlow
        value={value}
        format={formatOptions}
        prefix={prefix}
        suffix={suffix}
        transformTiming={{ duration: 280, easing: "ease-out" }}
        spinTiming={{ duration: 280, easing: "ease-out" }}
        opacityTiming={{ duration: 140, easing: "ease-out" }}
      />
    </span>
  );
}
