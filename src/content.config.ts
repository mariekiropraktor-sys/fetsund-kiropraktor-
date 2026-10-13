import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blogginnleggene ligger som Markdown i src/content/blogg/.
// Filnavnet er adressen: vanlige-arsaker-til-vondt-i-nakken.md → /vanlige-arsaker-til-vondt-i-nakken/
const blogg = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blogg" }),
  schema: z.object({
    title: z.string(),
    seoTittel: z.string().optional(), // kortere tittel for Google (maks ca. 60 tegn)
    description: z.string().default(""),
    date: z.coerce.date(),
    tema: z.enum(["rygg-og-nakke", "svimmelhet-og-hode", "halebein-og-bekken", "gravid-og-barn", "ledd-og-muskler", "annet"]).default("annet"),
    image: z.string().optional(),
    bildeTekst: z.string().optional(),
    kortFortalt: z.array(z.string()).default([]),
    // marie | sara | klinikken – styrer forfatterboksen nederst
    forfatter: z.enum(["marie", "sara", "klinikken"]).default("klinikken"),
    utkast: z.boolean().default(false),
  }),
});

// Felles mal for plager og behandlingsmetoder. Adressene er de samme som på WordPress:
// src/content/behandlingsomrade/<adresse>.md → /behandlingsomrade/<adresse>/
const side = z.object({
  tittel: z.string(),
  kortNavn: z.string(), // kort navn på kortene i oversikten, f.eks. «Nakke»
  kortTekst: z.string(), // én kort linje under navnet på kortet
  gruppe: z.enum(["rygg", "ledd", "hode", "livsfase"]).optional(), // bare for plager
  seoTittel: z.string().optional(),
  beskrivelse: z.string().default(""),
  ingress: z.string().default(""),
  bilde: z.string().optional(),
  kortFortalt: z.array(z.string()).default([]),
  kiropraktor: z.enum(["marie", "sara"]).optional(), // hvem som har dette som spesialfelt
  rekkefolge: z.number().default(50),
  oppdatert: z.coerce.date().optional(),
});

const behandlingsomrade = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/behandlingsomrade" }),
  schema: side,
});

const behandlingsmetode = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/behandlingsmetode" }),
  schema: side,
});

// Øvelsessiden /ovelser/: én fil per kategori i src/content/ovelser/.
// utkast: true = vises bare på den skjulte forhåndsvisningen /ovelser/utkast/ til den er godkjent.
// En kategori uten øvelser, lenker eller merknad vises ikke.
const ovelser = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/ovelser" }),
  schema: z.object({
    navn: z.string(), // f.eks. «Nakke»
    rekkefolge: z.number().default(50),
    ingress: z.string().default(""),
    utkast: z.boolean().default(false),
    kiropraktor: z.enum(["marie", "sara"]).optional(), // hvem som har laget programmet
    plager: z.array(z.string()).default([]), // plagesider (filnavn) som skal lenke hit
    merknad: z.string().optional(), // vises i en egen boks, f.eks. ved krystallsyke
    bilde: z.string().optional(), // f.eks. et øvelsesark
    ovelser: z
      .array(
        z.object({
          navn: z.string(),
          tekst: z.string(),
          dosering: z.string().optional(), // f.eks. «2 sett à 8 repetisjoner»
          video: z.string().optional(), // YouTube-id
        }),
      )
      .default([]),
    lenker: z.array(z.object({ tekst: z.string(), lenke: z.string() })).default([]),
  }),
});

export const collections = { blogg, behandlingsomrade, behandlingsmetode, ovelser };
