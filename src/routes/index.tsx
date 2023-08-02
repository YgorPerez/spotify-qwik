import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export default component$(() => {
  return (
    <>
      <Skeleton class="h-64 w-64" />
      <Button>Test</Button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
