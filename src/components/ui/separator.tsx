import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

import { cn } from "~/utils/cn";

export type SeparatorProps = QwikIntrinsicElements["div"] &
  {
    orientation?: "vertical" | "horizontal",
    decorative?: boolean
  };

const Separator = component$(
  ({ class: className, orientation = "horizontal", decorative = true, ...props }: SeparatorProps) => {
    const semanticProps = decorative
    ? { role: 'none' }
    : { 'aria-orientation': orientation, role: 'separator' };

    return (
      <div
      {...semanticProps}
        class={cn(className )}
        {...props}
      >
      </div>
    );
  }
);

export { Separator };

