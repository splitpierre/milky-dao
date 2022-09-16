import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import image from "@astrojs/image";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://milky-dao.netlify.app/",
  integrations: [tailwind(), solid(), image(), mdx()],
  vite: {
    ssr: {
      external: ["@11ty/eleventy-img", "svgo"],
    },
  },
});
