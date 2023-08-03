import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { getSearch } from "~/server";

export default component$(() => {
  const greeting = useSignal("Test")
  return (
    <>
      <Skeleton class="h-64 w-64" />
      <Button onClick$={async () => {
        greeting.value = (await getSearch({searchTerm: "taylor"})).albums?.[0]?.name || "no data"
      }}>{greeting}</Button>
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
