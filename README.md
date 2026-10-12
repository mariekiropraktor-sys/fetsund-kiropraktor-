# fetsundkiropraktor.no

Nettsiden til Fetsund Kiropraktorsenter. Bygget med [Astro](https://astro.build)
og publisert på Vercel. Hver gang noe pushes til `main`, bygges og publiseres siden.

## Kjøre lokalt

```bash
npm install
npm run dev
```

Åpne http://localhost:4321.

## Endre vanlige ting

- **Telefon, åpningstider, priser, kiropraktorene, menyen:** `src/data/site.ts`
- **Plager og metoder:** `src/content/behandlingsomrade/` og `src/content/behandlingsmetode/`
- **Blogginnlegg:** `src/content/blogg/`
- **Videresendinger fra gamle adresser:** `vercel.json`
