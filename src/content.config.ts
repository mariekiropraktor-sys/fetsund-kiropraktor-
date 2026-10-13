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

export const collections = { blogg, behandlingsomrade, behandlingsmetode };
