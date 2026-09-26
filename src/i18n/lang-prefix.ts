// The language lives in the URL: /es/... is Spanish, /pt/... is Portuguese, no prefix is English.
// The router runs under the prefix as its basename, so every <Link to="/pricing"> keeps the language.

export type SiteLanguage = "en-US" | "es" | "pt-BR";

const PREFIX_TO_LANGUAGE: Record<string, SiteLanguage> = { es: "es", pt: "pt-BR" };

export const LANGUAGE_PREFIX: Record<SiteLanguage, string> = { "en-US": "", es: "/es", "pt-BR": "/pt" };

/** "/es/pricing" -> "es", "/pricing" -> null */
export const prefixFromPath = (pathname: string): string | null => {
  const match = pathname.match(/^\/(es|pt)(?=\/|$)/);
  return match ? match[1] : null;
};

export const languageFromPath = (pathname: string): SiteLanguage => {
  const prefix = prefixFromPath(pathname);
  return prefix ? PREFIX_TO_LANGUAGE[prefix] : "en-US";
};

const initialPath = typeof window !== "undefined" ? window.location.pathname : "/";

/** Language of the page as loaded. Switching language reloads the page under the new prefix. */
export const INITIAL_LANGUAGE: SiteLanguage = languageFromPath(initialPath);

/** Router basename: "/es", "/pt" or undefined for English. */
export const ROUTER_BASENAME: string | undefined = LANGUAGE_PREFIX[INITIAL_LANGUAGE] || undefined;

/** Full URL path for a site path in a given language: ("/pricing", "es") -> "/es/pricing". */
export const localizedPath = (path: string, language: SiteLanguage = INITIAL_LANGUAGE) => {
  const prefix = LANGUAGE_PREFIX[language];
  if (!prefix) return path || "/";
  return path === "/" || path === "" ? prefix : `${prefix}${path}`;
};

/** For raw window.location redirects to an internal path, which bypass the router basename. */
export const withLanguagePrefix = (url: string) => (url.startsWith("/") ? localizedPath(url) : url);
