// Laster ned alle bildene fra den gamle WordPress-siden til public/bilder/wp/,
// slik at den nye siden ikke er avhengig av WordPress etter flyttingen.
// Kjør med: npm run hent-bilder   (krever internett, gjøres én gang før WordPress stenges)

import fs from "node:fs";
import path from "node:path";

const liste = fs.readFileSync("scripts/bilder.txt", "utf8").split("\n").filter(Boolean);
// Bilder som brukes direkte i malene (logo, forsidebilde, kiropraktorene)
const faste = [
  "Fetsund-Kiropraktorsenter-Tekst.webp",
  "hero-forside.webp",
  "MAthilde.webp",
  "Untitled-design.webp",
  "Sara.webp",
  "marie-og-sara-.webp",
].map((f) => `https://fetsundkiropraktor.no/wp-content/uploads/${f}`);

const ut = path.resolve("public/bilder/wp");
fs.mkdirSync(ut, { recursive: true });
let ok = 0;
for (const url of [...new Set([...faste, ...liste])]) {
  const fil = path.join(ut, path.basename(url));
  if (fs.existsSync(fil)) continue;
  const svar = await fetch(url);
  if (!svar.ok) {
    console.warn(`Fant ikke ${url} (${svar.status})`);
    continue;
  }
  fs.writeFileSync(fil, Buffer.from(await svar.arrayBuffer()));
  ok++;
}
console.log(`Lastet ned ${ok} bilder til public/bilder/wp/. Sett BILDER = "/bilder/wp" i src/data/site.ts.`);
