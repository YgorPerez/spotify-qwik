import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import Footer from "~/components/app/footer";
import Header from "~/components/app/header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  const MONTH_IN_SECONDS = 60 * 60 * 24 * 30;
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: MONTH_IN_SECONDS,
    // Max once every 30 days, revalidate on the server to get a fresh version of this page
    maxAge: MONTH_IN_SECONDS,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().getFullYear(),
  };
});

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
