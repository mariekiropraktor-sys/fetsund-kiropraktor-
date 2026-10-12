// Engangsskript: henter innhold fra WordPress-eksporten til fetsundkiropraktor.no
// og lagrer det som Markdown-filer:
//   innlegg            → src/content/blogg/<adresse>.md            → /<adresse>/
//   behandlingsomrade  → src/content/behandlingsomrade/<adresse>.md → /behandlingsomrade/<adresse>/
//   behandlingsmetode  → src/content/behandlingsmetode/<adresse>.md → /behandlingsmetode/<adresse>/
//
// Kjør med: node scripts/import-wordpress.mjs <sti-til-eksport.xml>
// (WordPress: Verktøy → Eksporter → «Alt innhold»)
//
// Adressene beholdes uendret, så gamle lenker og Google-plasseringer fortsetter å virke.
// Alle bilder fra wp-content/uploads får ny adresse under /bilder/wp/, og listen over
// bilder som må lastes ned lagres i scripts/bilder.txt (se scripts/hent-bilder.mjs).

import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";

const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error("Bruk: node scripts/import-wordpress.mjs <eksport.xml>");
  process.exit(1);
}
const xml = fs.readFileSync(xmlPath, "utf8");

const cdata = (s) => (s ?? "").replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
const tag = (item, name) => {
  const m = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? cdata(m[1].trim()) : "";
};
const items = xml.split("<item>").slice(1).map((s) => s.split("</item>")[0]);
const meta = (it, key) => {
  const re = new RegExp(
    `<wp:meta_key><!\\[CDATA\\[${key}\\]\\]></wp:meta_key>\\s*<wp:meta_value><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></wp:meta_value>`,
  );
  const m = it.match(re);
  return m ? m[1] : "";
};

const attachments = {};
for (const it of items) {
  if (tag(it, "wp:post_type") === "attachment") attachments[tag(it, "wp:post_id")] = tag(it, "wp:attachment_url");
}

// --- Bilder: alle wp-content-adresser samles og skrives om til /bilder/wp/<filnavn> ---
const bilder = new Set();
const bildeRe = /https?:\/\/(?:www\.)?fetsundkiropraktor\.no\/wp-content\/uploads\/[^"'\s)]+?\.(?:webp|jpe?g|png|gif|svg)/gi;
const nyBildeadresse = (url) => {
  bilder.add(url);
  return `/bilder/wp/${path.basename(url)}`;
};

// --- Hvem eier hva ---
// Forfatter i WordPress → kiropraktor (styrer forfatterboksen)
const forfatterFor = (it) => {
  const c = tag(it, "dc:creator").toLowerCase();
  if (c.includes("sara") || c.includes("nordanger")) return "sara";
  if (c.includes("marie") || c.includes("hermansen")) return "marie";
  return "klinikken";
};
// Tema for filtrering på bloggsiden (gjettes fra adressen – rett gjerne opp for hånd)
const temaFor = (slug) => {
  if (/halebein|bekken/.test(slug)) return "halebein-og-bekken";
  if (/gravid|svangerskap|fodsel|baby|barn/.test(slug)) return "gravid-og-barn";
  if (/rygg|nakke|korsrygg/.test(slug)) return "rygg-og-nakke";
  if (/fot|kne|skulder|albue|hofte|sete|trigger|muskel|cuboid|senior/.test(slug)) return "ledd-og-muskler";
  return "annet";
};
// Spesialfelt per behandlingsområde
const spesialist = {
  halebenssmerter: "sara",
  "gravide-og-etter-svangerskap": "sara",
  "spebarn-og-barn": "sara",
  svimmelhet: "marie",
  krystallsyken: "marie",
  kjevesmerter: "marie",
};

// --- Rydding av WordPress-HTML ---
const youtubeId = (url) => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return m ? m[1] : null;
};
const youtubeEmbed = (id) =>
  `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="Video fra YouTube" loading="lazy" allowfullscreen></iframe></div>`;

function fixLinks(html) {
  return html
    .replace(bildeRe, nyBildeadresse)
    .replace(/https?:\/\/(?:www\.)?fetsundkiropraktor\.no(\/[^"]*)?/g, (_, p) => p || "/")
    .replace(/[?&]utm_source=chatgpt\.com/g, "")
    .replace(/<a [^>]*href="(?:https:\/\/chatgpt\.com[^"]*|\/Users\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "$1");
}

function autop(html) {
  const block = /^<(h[1-6]|ul|ol|li|table|blockquote|div|figure|iframe|hr|pre)/i;
  return html
    .split(/\n\s*\n/)
    .map((c) => c.trim())
    .filter((c) => c && c !== "&nbsp;")
    .map((c) => (block.test(c) ? c : `<p>${c.replace(/\n/g, "<br>")}</p>`))
    .join("\n\n");
}

function clean(raw) {
  let html = raw.replace(/\r/g, "");
  html = html.replace(/<!--[\s\S]*?-->/g, ""); // Gutenberg-kommentarer
  html = html.replace(/\[embed\]\s*(\S+?)\s*\[\/embed\]/g, (_, url) => {
    const id = youtubeId(url);
    return id ? `\n\n${youtubeEmbed(id)}\n\n` : url;
  });
  html = html.replace(/^\s*(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/\S+)\s*$/gm, (line, url) => {
    const id = youtubeId(url);
    return id ? `\n\n${youtubeEmbed(id)}\n\n` : line;
  });
  html = html.replace(/<h[1-6][^>]*>\s*(?:&nbsp;)?\s*<\/h[1-6]>/g, "");
  html = html.replace(/<(\/?)h1([^>]*)>/g, "<$1h2$2>");
  html = html.replace(
    /\[caption[^\]]*\]\s*((?:<a [^>]*>)?<img[^>]*>(?:<\/a>)?)\s*([\s\S]*?)\[\/caption\]/g,
    (_, img, text) => `<figure>${img}${text.trim() ? `<figcaption>${text.trim()}</figcaption>` : ""}</figure>`,
  );
  html = fixLinks(html);
  html = html.replace(/(<\/(?:h[1-6]|ul|ol|table|blockquote|figure)>)\n/g, "$1\n\n");
  html = html.replace(/\n(<(?:h[1-6]|ul|ol|table|blockquote|figure)[\s>])/g, "\n\n$1");
  return autop(html);
}

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", emDelimiter: "*" });
td.keep(["iframe", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td"]);
td.addRule("video", {
  filter: (node) => node.nodeName === "DIV" && node.getAttribute("class") === "video",
  replacement: (_, node) => `\n\n${node.outerHTML}\n\n`,
});

const yaml = (s) => JSON.stringify(s ?? "");
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
// Emojier fjernes fra titler (de ser rotete ut hos Google)
const utenEmoji = (s) => s.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s+/g, " ").trim();

const typer = { post: "blogg", behandlingsomrade: "behandlingsomrade", behandlingsmetode: "behandlingsmetode" };
const teller = {};

for (const it of items) {
  const type = tag(it, "wp:post_type");
  if (!typer[type] || tag(it, "wp:status") !== "publish") continue;
  const slug = decodeURIComponent(tag(it, "wp:post_name"));
  const tittel = utenEmoji(decode(tag(it, "title")));
  const beskrivelse = utenEmoji(decode(meta(it, "_aioseo_description") || tag(it, "excerpt:encoded")).replace(/\s+/g, " "));
  const thumb = attachments[meta(it, "_thumbnail_id")];
  const bilde = thumb ? nyBildeadresse(thumb) : "";

  let html = clean(tag(it, "content:encoded"));
  if (bilde) {
    const stem = path.basename(bilde).replace(/(-\d+x\d+)?(\.[a-z]+)+$/i, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    html = html.replace(new RegExp(`<img[^>]*src="[^"]*${stem}(?:-\\d+x\\d+)?(?:\\.[a-z]+)+"[^>]*>`, "i"), "");
  }
  const body = td.turndown(html).replace(/^[ \t *_]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
  if (!body) {
    // Tomme sider (f.eks. laget i Bricks) hoppes over – de videresendes i vercel.json
    console.warn(`  Hoppet over ${type}/${slug}: tom i eksporten`);
    continue;
  }

  const front =
    type === "post"
      ? [
          `title: ${yaml(tittel)}`,
          `description: ${yaml(beskrivelse)}`,
          `date: ${tag(it, "wp:post_date").slice(0, 10)}`,
          `tema: ${temaFor(slug)}`,
          bilde && `image: ${yaml(bilde)}`,
          `forfatter: ${forfatterFor(it)}`,
        ]
      : [
          `tittel: ${yaml(tittel)}`,
          `beskrivelse: ${yaml(beskrivelse)}`,
          bilde && `bilde: ${yaml(bilde)}`,
          spesialist[slug] && type === "behandlingsomrade" && `kiropraktor: ${spesialist[slug]}`,
          `oppdatert: ${tag(it, "wp:post_modified").slice(0, 10)}`,
        ];

  const dir = path.resolve("src/content", typer[type]);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${slug}.md`), `---\n${front.filter(Boolean).join("\n")}\n---\n\n${body}\n`);
  teller[type] = (teller[type] ?? 0) + 1;
}

fs.writeFileSync("scripts/bilder.txt", [...bilder].sort().join("\n") + "\n");
console.log("Ferdig:", teller, `· ${bilder.size} bilder i scripts/bilder.txt`);
