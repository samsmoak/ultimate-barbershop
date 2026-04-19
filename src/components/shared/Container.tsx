import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "default" | "wide" | "narrow";
};

export function Container({
  children,
  size = "default",
  className,
  ...rest
}: Props) {
  const width =
    size === "wide"
      ? "max-w-[1600px]"
      : size === "narrow"
      ? "max-w-4xl"
      : "max-w-[1280px]";
  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", width, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
