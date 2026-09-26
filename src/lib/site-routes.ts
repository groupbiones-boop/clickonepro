// English public URLs. Industry pages keep their original (Portuguese) keys internally,
// because translations and images are keyed by them; only the URL segment is English.
export const INDUSTRY_URL_TO_KEY: Record<string, string> = {
  cleaning: "limpeza",
  remodeling: "construcao",
  hvac: "hvac",
  plumbing: "encanamento",
  electrical: "eletrica",
  landscaping: "paisagismo",
  "pool-service": "piscinas",
  moving: "mudancas",
  roofing: "telhados",
  "pest-control": "controle-pragas",
  locksmith: "chaveiro",
  painting: "pintura",
  flooring: "pisos",
  "home-inspection": "inspecao-residencial",
  "medical-clinic": "clinica-medica",
  dentist: "dentista",
  chiropractic: "quiropraxia",
  veterinary: "veterinario",
  "hair-salon": "salao-beleza",
  "spa-massage": "spa-massagem",
};

const INDUSTRY_KEY_TO_URL: Record<string, string> = Object.fromEntries(
  Object.entries(INDUSTRY_URL_TO_KEY).map(([url, key]) => [key, url]),
);

/** Public path for an industry, from its internal key ("encanamento" -> "/industries/plumbing"). */
export const industryPath = (key: string) => `/industries/${INDUSTRY_KEY_TO_URL[key] ?? key}`;

/** Internal key for an industry URL segment; accepts the old Portuguese slug too. */
export const industryKeyFromUrl = (segment: string | undefined) =>
  segment ? INDUSTRY_URL_TO_KEY[segment] ?? segment : "";
