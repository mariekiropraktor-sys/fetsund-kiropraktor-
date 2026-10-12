// Fakta som brukes mange steder på siden. Endres her, så oppdateres alt.

// Bildene ligger foreløpig på den gamle WordPress-siden. Kjør `npm run hent-bilder`
// én gang (krever internett) for å laste dem ned til public/bilder/, og sett
// deretter BILDER til "/bilder". Ikke la siden lenke til WordPress etter flyttingen.
const BILDER = "https://fetsundkiropraktor.no/wp-content/uploads";
export const bilde = (fil: string) => `${BILDER}/${fil}`;

export const site = {
  navn: "Fetsund Kiropraktorsenter",
  adresse: "Garderbakken 1, 1900 Fetsund",
  telefon: "463 32 766",
  telefonLenke: "tel:+4746332766",
  epost: "fetsundkiropraktor@gmail.com",
  booking:
    "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=54907264-049e-11eb-8fc8-26c6f94d64b7",
  apningstider: [{ dager: "Mandag–fredag", tid: "08.00–18.00" }],
  apningstiderKort: "Man–fre 08–18",
  facebook: "https://www.facebook.com/www.fetsundkiropraktor.no",
  instagram: "https://www.instagram.com/fetsundkiropraktorsenter/",
  logo: bilde("Fetsund-Kiropraktorsenter-Tekst.webp"),
  heroBilde: bilde("hero-forside.webp"),
  grunnlagt: 2020,
};

const marie = "https://fetsundkiropraktormarie.no";
const sara = "https://fetsundkiropraktorsara.no";

// Kiropraktorene. «side» = egen nettside, «booking» = direktelenke i Pasientsky.
export const kiropraktorer = [
  {
    id: "marie",
    navn: "Marie Hermansen",
    tittel: "Kiropraktor, MNKF · medgründer",
    bilde: bilde("Untitled-design.webp"),
    spesialfelt: ["Svimmelhet og krystallsyke", "Kjevesmerter", "Hodepine"],
    kort: "Har VNG-briller og egen svimmelhetsundersøkelse. Behandler også nakke, rygg og ledd.",
    side: marie,
    booking: site.booking,
  },
  {
    id: "sara",
    navn: "Sara Nordanger",
    tittel: "Kiropraktor · medgründer",
    bilde: bilde("Sara.webp"),
    spesialfelt: ["Halebeinsmerter", "Gravide og etter fødsel", "Spedbarn og barn"],
    kort: "Halebeinsmerter er hennes spesialisering. Ser også mange med rygg, nakke og idrettsskader.",
    side: sara,
    booking:
      "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=54907264-049e-11eb-8fc8-26c6f94d64b7&timeslotType=4d6f6546-0875-11eb-8cb2-367c89629524&calendarId=178e4e32-24eb-11eb-be16-eed210cc88f1",
  },
  {
    id: "mathilde",
    navn: "Mathilde Opsvik",
    tittel: "Kiropraktor",
    bilde: bilde("MAthilde.webp"),
    spesialfelt: ["Rygg og nakke", "Skulder og bekken", "Muskelbehandling"],
    kort: "Over 10 års erfaring, med videreutdanning i sportsmassasje, tørrnåling og kopping.",
    side: "/om-klinikken/#mathilde",
    booking: site.booking,
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
export const plager: { navn: string; tekst: string; lenke: string }[] = [
  { navn: "Nakke", tekst: "Låst, stiv eller vond", lenke: "/behandlingsomrade/akutte-kroniske-nakkeplager/" },
  { navn: "Korsrygg", tekst: "Akutt og langvarig", lenke: "/behandlingsomrade/vondt-i-ryggen/" },
  { navn: "Brystrygg og ribben", tekst: "Stikk og stivhet", lenke: "/behandlingsomrade/brystryggsmerter/" },
  { navn: "Skulder og muskler", tekst: "Smerter og knuter", lenke: "/behandlingsomrade/muskelsmerter/" },
  { navn: "Hofte", tekst: "Også sete og lyske", lenke: "/behandlingsomrade/hoftesmerter/" },
  { navn: "Kne, ankel og fot", tekst: "Belastning og skader", lenke: "/behandlingsomrade/fot-og-ankel-smerter/" },
  { navn: "Albue og håndledd", tekst: "Også tennisalbue", lenke: "/behandlingsomrade/albue-og-handleddsmerter/" },
  { navn: "Idrettsskader", tekst: "Tilbake i aktivitet", lenke: "/behandlingsomrade/idrettsskader-2/" },
  { navn: "Spedbarn og barn", tekst: "Trygg og skånsom", lenke: "/behandlingsomrade/spebarn-og-barn/" },
  { navn: "Seniorer", tekst: "Bevegelse og balanse", lenke: "/behandlingsomrade/seniorpasienten/" },
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
      { navn: "Svimmelhetsundersøkelse", pris: "1 100 kr", tekst: "Grundig undersøkelse ved svimmelhet, krystallsyke eller balanseplager." },
      { navn: "Oppfølgende behandling – svimmelhet", pris: "625 kr", tekst: "Oppfølging etter svimmelhetsundersøkelse." },
      { navn: "Dobbelttime – svimmelhet", pris: "855 kr", tekst: "Når svimmelheten trenger ekstra tid." },
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
  { navn: "Kiropraktorene", lenke: "/om-klinikken/" },
  { navn: "Priser", lenke: "/priser/" },
  { navn: "Blogg", lenke: "/blogg/" },
  { navn: "Kontakt", lenke: "/kontakt-oss/" },
];

export const temaNavn: Record<string, string> = {
  "rygg-og-nakke": "Rygg og nakke",
  "halebein-og-bekken": "Halebein og bekken",
  "gravid-og-barn": "Gravid og barn",
  "ledd-og-muskler": "Ledd og muskler",
  annet: "Annet",
};

export const eksterne = { marie, sara, krystallsykehjelpen: "https://www.krystallsykehjelpen.no/" };
