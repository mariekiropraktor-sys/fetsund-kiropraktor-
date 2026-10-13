import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";

// Blogginnlegg merket «utkast: true» skal ikke med i sitemap
// (mappen kan mangle før innholdet er importert)
const bloggMappe = "./src/content/blogg";
const utkast = (fs.existsSync(bloggMappe) ? fs.readdirSync(bloggMappe) : [])
  .filter((f) => /^utkast:\s*true/m.test(fs.readFileSync(`${bloggMappe}/${f}`, "utf8")))
  .map((f) => `/${f.replace(/\.md$/, "")}/`);

// Ekte HTTP 301-videresendinger ligger i vercel.json (Vercels egen mekanisme).
export default defineConfig({
  site: "https://fetsundkiropraktor.no",
  trailingSlash: "always",
  build: { format: "directory" },
  // Lager sitemap-index.xml automatisk (404-siden tas ikke med)
  integrations: [sitemap({ filter: (side) => !side.includes("/404") && !side.endsWith("/bestill/") && !side.endsWith("/ovelser/utkast/") && !utkast.some((u) => side.endsWith(u)) })],
});
