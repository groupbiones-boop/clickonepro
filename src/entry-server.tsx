// Build-time prerender entry (see scripts/prerender.mjs). Renders one URL to static HTML so search
// engines and AI crawlers can read each page without running JavaScript. Not used in the browser.
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import i18n from "./i18n";
import { AppProviders, AppRoutes } from "./App";
import { LANGUAGE_PREFIX, type SiteLanguage } from "./i18n/lang-prefix";

export interface RenderResult {
  html: string;
  head: string;
  htmlLang: string;
}

interface HelmetData {
  title: { toString(): string };
  meta: { toString(): string };
  link: { toString(): string };
  script: { toString(): string };
}

/** url is the full public path, including the /es or /pt prefix. */
export async function render(url: string, language: SiteLanguage): Promise<RenderResult> {
  await i18n.changeLanguage(language);
  const helmetContext: { helmet?: HelmetData } = {};
  const basename = LANGUAGE_PREFIX[language] || undefined;

  const html = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new PassThrough();
    sink.on("data", (chunk: Buffer) => chunks.push(chunk));
    sink.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    // Never let one slow page hang the build: give up on it after 15 seconds.
    const timer = setTimeout(() => {
      abort();
      reject(new Error(`prerender timed out for ${url}`));
    }, 15000);
    const { pipe, abort } = renderToPipeableStream(
      <AppProviders helmetContext={helmetContext}>
        <StaticRouter location={url} basename={basename}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>,
      {
        // Wait for every lazy page to load so the full page text is in the HTML.
        onAllReady() {
          clearTimeout(timer);
          pipe(sink);
        },
        onError(error) {
          clearTimeout(timer);
          reject(error);
        },
      },
    );
  });

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).join("\n")
    : "";
  return { html, head, htmlLang: language };
}
