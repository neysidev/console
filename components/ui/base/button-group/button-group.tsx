"use client";

import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";

const groupStyles =
  "relative z-0 py-0.5 inline-flex w-max -space-x-px rounded-lg border border-gray-200 bg-gray-50 shadow-xs";

const itemStyles = [
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-transparent mx-0.5 px-2.5 py-1.5 text-xs font-medium outline-none transition-colors",
  "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[selected]:bg-primary data-[selected]:text-primary data-[selected]:shadow-xs",
].join(" ");

export interface ButtonGroupProps extends Omit<
  ToggleButtonGroupProps,
  "orientation"
> {
  className?: string;
}

export function ButtonGroupRoot({
  children,
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <ToggleButtonGroup
      selectionMode="single"
      className={cx(groupStyles, className)}
      {...props}
    >
      {children}
    </ToggleButtonGroup>
  );
}

export interface ButtonGroupItemProps extends ToggleButtonProps {
  className?: string;
}

export function ButtonGroupItem({
  children,
  className,
  ...props
}: ButtonGroupItemProps) {
  return (
    <ToggleButton className={cx(itemStyles, className)} {...props}>
      {children}
    </ToggleButton>
  );
}
