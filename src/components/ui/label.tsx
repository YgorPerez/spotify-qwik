import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/cn";

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

export type LabelProps = QwikIntrinsicElements["label"] &
  VariantProps<typeof labelVariants>;

const Label = component$(
  ({ class: className, ...props }: LabelProps) => {
    return (
      <label
        class={cn(labelVariants({ className }))}
        {...props}
      >
        <Slot />
      </label>
    );
  }
);

export { Label, labelVariants };

