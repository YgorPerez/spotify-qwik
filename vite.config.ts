import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import { env } from "~/env.mjs";

// console.log(env)

export default defineConfig(() => {
  const MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": `public, max-age=${MONTH_IN_SECONDS}`,
      },
    },
  };
});
