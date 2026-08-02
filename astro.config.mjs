import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://yeshu.cloud/",
  compressHTML: true,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [
          remarkCollapse,
          {
            test: "Table of contents",
          },
        ],
      ],
    }),
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
});
