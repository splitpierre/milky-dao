import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://milky-dao.vercel.app/",
  output: "server",
  integrations: [tailwind(), solid(), image(), mdx()],
  vite: {
    ssr: {
      external: ["@11ty/eleventy-img", "svgo"],
    },
  },
  adapter: vercel(),
});
