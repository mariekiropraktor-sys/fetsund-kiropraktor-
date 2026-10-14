# fetsundkiropraktor.no — prosjektkontekst

## Om prosjektet
Klinikksiden til Fetsund Kiropraktorsenter (Sara Nordanger og Marie Hermansen;
Mathilde Opsvik har sluttet, okt. 2026). Flyttes fra WordPress/Bricks (Totalweb) til Astro på Vercel
høsten 2026, med samme design som fetsundkiropraktormarie.no.
Marie er nybegynner innen webutvikling: forklar endringer enkelt, på norsk, og
gjerne som en kort liste over hva som er endret. Sara er medeier av siden.

Språk: all UI-tekst og kodekommentarer på **norsk (bokmål)**.

## Rollefordeling mellom nettsidene
- **fetsundkiropraktor.no (denne)**: felles klinikkside. Eier de generelle plagene
  (/behandlingsomrade/…) og behandlingsmetodene (/behandlingsmetode/…).
  Marie-siden lenker hit for nakke, rygg, skulder og metoder – disse adressene må
  aldri endres uten 301 i `vercel.json`.
- **fetsundkiropraktormarie.no**: svimmelhet, krystallsyke, hodepine, kjeve.
  Spesialfelt-kortene her lenker dit.
- **fetsundkiropraktorsara.no**: Saras egen side (halebein, gravide, barn).
- **Krystallsykehjelpen**: krystallsyke i dybden.

## Tech stack
- **Astro 5**, statisk build, ingen SSR-adapter
- **Vercel**, automatisk deploy ved push til `main`
- Booking via ekstern **Pasientsky**-lenke (se `src/data/site.ts`)
- Innhold som Markdown, importert fra WordPress med `scripts/import-wordpress.mjs`

## Struktur
```
src/
├── data/site.ts                  # telefon, adresse, åpningstider, priser, kiropraktorene, meny
├── content/blogg/                # blogginnlegg (filnavn = adresse, ligger på rot-nivå)
├── content/behandlingsomrade/    # plager → /behandlingsomrade/<navn>/
├── content/behandlingsmetode/    # metoder → /behandlingsmetode/<navn>/
├── components/Fagside.astro      # felles mal for plage- og metodesider
├── pages/                        # forside, om-klinikken, priser, kontakt-oss, oversikter, blogg
└── styles/global.css             # samme designsystem som Marie-siden
scripts/import-wordpress.mjs      # WordPress-eksport (XML) → Markdown
scripts/hent-bilder.mjs           # laster ned bildene fra WordPress til public/bilder/wp/
vercel.json                       # 301-videresendinger fra gamle adresser
```

## Design
Samme som Marie-siden: `--ink` #101923, `--bg` #eef2f7, `--teal` #0b6e81,
`--teal-bright` #18bad3. Fonter Fraunces (overskrifter) og Outfit (brødtekst),
fra @fontsource (ingen Google Fonts av personvernhensyn).

## Viktige arbeidsvaner
- Fakta (telefon, åpningstider, priser) endres kun i `src/data/site.ts`.
  Prisene skal være like på klinikksiden og Marie-siden.
- Gamle adresser som fjernes skal få en 301 i `vercel.json`.
- Kjør `npm run build` før push.
- Commits må ha Marie som forfatter (`git config user.name "Marie Hermansen"`,
  `git config user.email mariekiropraktor@gmail.com`). Vercel (Hobby) bygger ikke commits
  fra andre forfattere, f.eks. «Claude <noreply@anthropic.com>».

## Gjenstår (okt. 2026)
1. Importere innhold: WordPress-eksport (Verktøy → Eksporter → Alt innhold), så
   `node scripts/import-wordpress.mjs eksport.xml`. Sjekk tema og forfatter i frontmatter.
2. `npm run hent-bilder` og sett `BILDER = "/bilder/wp"` i site.ts (bildene lenker
   til WordPress inntil da).
3. Vurdere dubletter: to innlegg om hodepine i svangerskapet, flere halebein-innlegg
   med -4/-6 i adressen, svimmelhetsinnlegg som også finnes på Marie-siden.
4. Flytte domenet fra Totalweb (DNS) når Sara har godkjent.

## Timebestilling hos Marie (besluttet 14. okt. 2026)
- Felles knapper (meny, mobil, bunn) går til klinikkens felles booking (`site.booking`).
- Marie har egne lenker i `kiropraktorer` (calendarId 8b02aa62…): `booking` = førstegangsundersøkelse,
  `bookingSvimmelhet`, `bookingOppfolging`, `bookingKalender`.
- Svimmelhet, krystallsyken og VNG-siden (`kiropraktor: marie`) har «Bestill svimmelhetsundersøkelse».
  Maries blogginnlegg om svimmelhet/krystallsyke likeså; hennes øvrige innlegg og kjevesmerter går til førstegang.
- Prissiden: svimmelhetsprisene bestilles i Maries kalender; dobbelttime svimmelhet = «Ring for time».
