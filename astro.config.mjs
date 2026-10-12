import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";

// Blogginnlegg merket «utkast: true» skal ikke med i sitemap
const utkast = fs
  .readdirSync("./src/content/blogg")
  .filter((f) => /^utkast:\s*true/m.test(fs.readFileSync(`./src/content/blogg/${f}`, "utf8")))
  .map((f) => `/${f.replace(/\.md$/, "")}/`);

// Ekte HTTP 301-videresendinger ligger i vercel.json (Vercels egen mekanisme).
export default defineConfig({
  site: "https://fetsundkiropraktor.no",
  trailingSlash: "always",
  build: { format: "directory" },
  // Lager sitemap-index.xml automatisk (404-siden tas ikke med)
  integrations: [sitemap({ filter: (side) => !side.includes("/404") && !side.endsWith("/bestill/") && !utkast.some((u) => side.endsWith(u)) })],
});
