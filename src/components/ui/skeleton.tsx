import { type HTMLAttributes } from "@builder.io/qwik";
import { cn } from "~/utils/cn";

function Skeleton({
  class: className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      class={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
