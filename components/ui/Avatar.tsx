import Image from "next/image";
import type { AvatarProps } from "@/types/avatar";

export type { AvatarProps } from "@/types/avatar";

export function Avatar({
  src,
  shape = "square",
  className = "",
  children,
}: AvatarProps) {
  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "rounded"
        ? "rounded-md"
        : "rounded-none";

  return (
    <span
      className={`inline-flex size-6 shrink-0 items-center justify-center overflow-hidden bg-[var(--color-avatar-bg)] text-[var(--color-text-primary)] ${shapeClass} ${className}`}
      aria-hidden
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={24}
          height={24}
          className="h-full w-full object-cover"
        />
      ) : (
        children
      )}
    </span>
  );
}
