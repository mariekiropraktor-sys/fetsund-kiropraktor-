// Fakta som brukes mange steder på siden. Endres her, så oppdateres alt.

// Bilder fra den gamle WordPress-siden ligger i public/bilder/wp/
// (lastes ned av GitHub-handlingen «Hent bilder fra WordPress»).
const BILDER = "/bilder/wp";
export const bilde = (fil: string) => `${BILDER}/${fil}`;

export const site = {
  navn: "Fetsund Kiropraktorsenter",
  adresse: "Garderbakken 1, 1900 Fetsund",
  telefon: "463 32 766",
  telefonLenke: "tel:+4746332766",
  epost: "fetsundkiropraktor@gmail.com",
  booking:
    "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=54907264-049e-11eb-8fc8-26c6f94d64b7",
  // Bekreftet av Marie 13. okt. 2026
  apningstider: [{ dager: "Mandag–fredag", tid: "08.00–17.00" }],
  apningstiderKort: "Man–fre 08–17",
  google: {
    vurdering: "4,9",
    antall: 47,
    // Googles offisielle lenkeformat – virker både i nettleser og i Google Maps-appen
    lenke:
      "https://www.google.com/maps/search/?api=1&query=Fetsund+Kiropraktorsenter&query_place_id=ChIJ4XMb3Bl9QUYRWxACPEU-F-4",
  },
  facebook: "https://www.facebook.com/www.fetsundkiropraktor.no",
  instagram: "https://www.instagram.com/fetsundkiropraktorsenter/",
  logo: "/bilder/logo.webp",
  heroBilde: "/bilder/marie-og-sara.webp",
  grunnlagt: 2020,
};

// Google Ads-måling. Står id tom, lastes ingen Google-kode og det vises ikke noe cookie-banner.
// id: Google-tag-ID fra Google Ads (Verktøy → Datastyring → Google-tag), f.eks. "AW-123456789".
// bestill / ring: konverteringsetiketter (delen etter «/» i send_to), f.eks. "AbC-D_efG-h12_34-567".
export const googleAds = {
  // Google Ads-taggen fra eksisterende konverteringskode i annonsekontoen.
  id: "AW-520953726",
  // Egne etiketter for klikk på bestilling og telefon må opprettes i Google Ads.
  // Bruk aldri etiketten for «Avtale bestilt» på et klikk – det er ikke en ferdig bestilling.
  bestill: "STS1CIrUy5wdEP6-tPgB", // «Klikk til timebestilling pasientsky» – sekundær konvertering
  ring: "",
};

const marie = "https://fetsundkiropraktormarie.no";
const pasientsky =
  "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=54907264-049e-11eb-8fc8-26c6f94d64b7";
const marieKalender = "8b02aa62-04b5-11eb-98d4-56c227606b2b";
const sara = "https://fetsundkiropraktorsara.no";

// Kiropraktorene. «side» = egen nettside, «booking» = direktelenke i Pasientsky.
// Begge skal komme like godt fram: like mange spesialfelt, og «ogsa» viser at begge behandler
// vanlige muskel- og skjelettplager.
export const kiropraktorer = [
  {
    id: "sara",
    navn: "Sara Nordanger",
    tittel: "Kiropraktor · medgründer",
    bilde: bilde("Sara.webp"),
    spesialfelt: ["Halebeinsmerter", "Gravide"],
    interessefelt: ["Etter fødsel", "Spedbarn"],
    ogsa: "Rygg, nakke, prolaps og isjias, idrettsskader",
    kort: "Spesialfelt i halebeinsmerter, gravide og tiden etter fødsel. Ser også mange med rygg- og nakkesmerter og idrettsskader.",
    side: sara,
    booking:
      "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=54907264-049e-11eb-8fc8-26c6f94d64b7&timeslotType=4d6f6546-0875-11eb-8cb2-367c89629524&calendarId=178e4e32-24eb-11eb-be16-eed210cc88f1",
  },
  {
    id: "marie",
    navn: "Marie Hermansen",
    tittel: "Kiropraktor, MNKF · medgründer",
    bilde: "/bilder/marie-portrett.webp",
    spesialfelt: ["Svimmelhet", "Krystallsyke", "Kjevesmerter"],
    interessefelt: ["Hodepine"],
    ogsa: "Nakke, rygg, skulder, hodepine og ledd",
    kort: "Spesialfelt i svimmelhet og krystallsyke, med VNG-briller. Behandler også mange med nakke, rygg, skulder og andre muskel- og leddplager.",
    side: marie,
    // Direkte i Maries kalender: førstegangsundersøkelse, svimmelhetsundersøkelse og oppfølging
    booking: `${pasientsky}&timeslotType=4d6f6546-0875-11eb-8cb2-367c89629524&calendarId=${marieKalender}`,
    bookingSvimmelhet: `${pasientsky}&timeslotType=d2162c00-a508-11f0-9831-e62cb3f7a407&calendarId=${marieKalender}`,
    bookingOppfolging: `${pasientsky}&timeslotType=6accef46-04b5-11eb-9a4f-ee3259d83450&calendarId=${marieKalender}`,
    bookingKalender: `${pasientsky}&calendarId=${marieKalender}`,
  },
];

// Spesialfeltene vises øverst på forsiden. De lenker til den kiropraktoren som eier temaet.
export const spesialfelt = [
  {
    navn: "Svimmelhet og krystallsyke",
    tekst: "Utredning med VNG-briller og målrettet behandling.",
    hvem: "Marie",
    lenke: `${marie}/svimmelhet/`,
  },
  {
    navn: "Halebeinsmerter",
    tekst: "Vondt når du sitter eller reiser deg? En egen spesialisering hos oss.",
    hvem: "Sara",
    lenke: "/behandlingsomrade/halebenssmerter/",
  },
  {
    navn: "Gravide og etter fødsel",
    tekst: "Bekken- og ryggplager i svangerskapet og tiden etter.",
    hvem: "Sara",
    lenke: "/behandlingsomrade/gravide-og-etter-svangerskap/",
  },
  {
    navn: "Kjeve og hodepine",
    tekst: "Smerter, klikking og spenningshodepine.",
    hvem: "Marie",
    lenke: `${marie}/kjevesmerter/`,
  },
];

// Vanlige plager. Adressene er de samme som på den gamle siden.
// Plager både Sara og Marie behandler (forsideforslaget okt. 2026). Lenker til klinikkens egne sider.
export const plager: { navn: string; tekst: string; lenke: string }[] = [
  { navn: "Nakke", tekst: "Låst, stiv eller vond", lenke: "/behandlingsomrade/akutte-kroniske-nakkeplager/" },
  { navn: "Korsrygg", tekst: "Akutt og langvarig", lenke: "/behandlingsomrade/vondt-i-ryggen/" },
  { navn: "Brystrygg", tekst: "Stiv og vond mellom skulderbladene", lenke: "/behandlingsomrade/brystryggsmerter/" },
  { navn: "Skulder", tekst: "Smerter og nedsatt bevegelse", lenke: "/skuldersmerter-for-under-og-etter-ett-kiropraktorbesok/" },
  { navn: "Hofte og kne", tekst: "Også senebetennelser", lenke: "/behandlingsomrade/hoftesmerter/" },
  { navn: "Fot og ankel", tekst: "Ofte henger bekkenet med", lenke: "/behandlingsomrade/fot-og-ankel-smerter/" },
  { navn: "Hodepine og kjeve", tekst: "Spenning, stress og klikking", lenke: "/behandlingsomrade/hodepine/" },
  { navn: "Muskelsmerter", tekst: "Muskelknuter og stivhet", lenke: "/behandlingsomrade/muskelsmerter-og-senebetennelser/" },
  { navn: "Seniorer", tekst: "Tilpasset behandling i alle aldre", lenke: "/behandlingsomrade/seniorpasienten/" },
];

// Utdrag fra Google-anmeldelser. Lim inn pasientenes egen ordlyd fra Google (ikke omskriv).
// Seksjonen viser bare sitatene som står her – er listen tom, vises kun vurderingen og lenken.
// Hentet ordrett fra klinikkens Google-oppføring 13. okt. 2026.
// Rekkefølge: Marie, Sara, generell (Sara står først i kiropraktor-seksjonen over).
export const anmeldelser: { tekst: string; om?: string }[] = [
  {
    tekst:
      "Tok kontakt med Marie hos Fetsund Kiropraktorsenter ang det jeg antok var krystallsyke og hun hjalp meg slik at problemet var borte etter første besøk! Fikk god oppfølging etterpå og hjelp med andre skavanker også. Veldig gode tre behandlinger hos henne til nå. Anbefales.",
    om: "Marie",
  },
  {
    tekst:
      "Sara er den desidert dyktigste og mest kunnskapsrike kiropraktoren jeg har vært hos. Hun er svært dedikert og engasjert i kvinnehelse og svangerskapsrelaterte utfordringer. Kommer heretter kun til å gå til Sara når jeg har behov for kiropraktorhjelp. Anbefales på det sterkeste!",
    om: "Sara",
  },
  {
    tekst: "Endelig fikk jeg hjelp til hofte og bekken plager jeg har slitt med i mange år. Høy kompetanse og grundige i sitt arbeid.",
  },
];

export const metoder = [
  {
    navn: "Kiropraktisk manipulasjon",
    tekst: "Klassisk leddbehandling som frigjør låste ledd i rygg og nakke.",
    lenke: "/behandlingsmetode/kiropraktisk-manipulasjonsbehandling/",
  },
  {
    navn: "Nålebehandling",
    tekst: "Tørrnåling av muskelknuter når massasje ikke er nok.",
    lenke: "/behandlingsmetode/nalebehandling/",
  },
  {
    navn: "Funksjonell muskeltesting",
    tekst: "Finner muskler som ikke samarbeider, og hvorfor smerten oppstår.",
    lenke: "/behandlingsmetode/funksjonell-muskeltesting/",
  },
  {
    navn: "Øvelser og veiledning",
    tekst: "Tilpassede øvelser og råd du kan følge opp hjemme.",
    lenke: "/behandlingsmetode/ovelsesveiledning/",
  },
];

export const andreMetoder: { navn: string; lenke?: string }[] = [
  { navn: "Triggerpunktmassasje", lenke: "/behandlingsmetode/triggerpunktsmassasje/" },
  { navn: "Mobilisering", lenke: "/behandlingsmetode/mobiliseringsbehandling/" },
  { navn: "Bindevevsmassasje", lenke: "/behandlingsmetode/bindevevsmassasje/" },
  { navn: "VNG-undersøkelse for svimmelhet", lenke: "/behandlingsmetode/vng-undersokelse-for-svimmelhet/" },
  { navn: "Kinesiotape" },
  { navn: "Kopping" },
];

// Samme priser som Marie-siden (fra 1. januar 2025). Hold dem like på begge sider.
export const priser = [
  {
    gruppe: "Muskel- og leddplager",
    intro: "Gjelder alle kiropraktorene.",
    timer: [
      { navn: "Førstegangskonsultasjon", pris: "910 kr", tekst: "For nye pasienter, eller hvis det er over ett år siden sist." },
      { navn: "Oppfølgende behandling", pris: "580 kr", tekst: "For deg som har vært hos oss det siste året." },
      { navn: "Dobbelttime", pris: "810 kr", tekst: "For tidligere pasienter som trenger ekstra tid. Avtales med kiropraktoren." },
    ],
  },
  {
    gruppe: "Svimmelhet",
    intro: "Bestilles hos Marie Hermansen. Undersøkelsen gjøres med VNG-briller.",
    timer: [
      { navn: "Svimmelhetsundersøkelse", bestill: "marie-svimmelhet", pris: "1 100 kr", tekst: "Grundig undersøkelse ved svimmelhet, krystallsyke eller balanseplager." },
      { navn: "Oppfølgende behandling – svimmelhet", bestill: "marie-kalender", pris: "625 kr", tekst: "Oppfølging etter svimmelhetsundersøkelse." },
      { navn: "Dobbelttime – svimmelhet", bestill: "ring", pris: "855 kr", tekst: "Når svimmelheten trenger ekstra tid." },
    ],
  },
];

export const tilleggspriser = [
  { navn: "Ekstra nåler eller kinesiotape", pris: "45 kr" },
  { navn: "Attest eller epikrise", pris: "150 kr" },
  { navn: "Sykmelding", pris: "50 kr" },
];

export const navigasjon = [
  { navn: "Plager", lenke: "/behandlingsomrader/" },
  { navn: "Behandling", lenke: "/behandlingsmetoder/" },
  { navn: "Øvelser", lenke: "/ovelser/" },
  { navn: "Kiropraktorene", lenke: "/om-klinikken/" },
  { navn: "Priser", lenke: "/priser/" },
  { navn: "Blogg", lenke: "/blogg/" },
  { navn: "Kontakt", lenke: "/kontakt-oss/" },
];

export const temaNavn: Record<string, string> = {
  "rygg-og-nakke": "Rygg og nakke",
  "svimmelhet-og-hode": "Svimmelhet, hodepine og kjeve",
  "halebein-og-bekken": "Halebein og bekken",
  "gravid-og-barn": "Gravid og barn",
  "ledd-og-muskler": "Ledd og muskler",
  annet: "Annet",
};

// Grupper på oversikten over plager
export const plageGrupper = [
  { id: "rygg", navn: "Rygg og nakke" },
  { id: "ledd", navn: "Ledd og muskler" },
  { id: "hode", navn: "Hode og svimmelhet" },
  { id: "livsfase", navn: "Gravid, barn og senior" },
] as const;

export const eksterne = { marie, sara, krystallsykehjelpen: "https://www.krystallsykehjelpen.no/" };
