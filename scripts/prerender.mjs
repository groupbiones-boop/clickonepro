// Writes a static HTML file for every public URL in public/sitemap.xml (all three languages), so the
// page text, title, canonical and hreflang are in the HTML itself. The browser app then takes over.
// A failure here never breaks the deploy: the site still works as a normal single-page app.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const SITE = "https://clickonepro.com";

// Tags that the page's own <SEO> output replaces in the prerendered head.
const STATIC_HEAD_TAGS = [
  /\s*<title>[^<]*<\/title>/,
  /\s*<meta property="og:type"[^>]*>/,
  /\s*<meta property="og:title"[^>]*>/,
  /\s*<meta property="og:description"[^>]*>/,
  /\s*<meta property="og:image" [^>]*>/,
  /\s*<meta name="twitter:card"[^>]*>/,
  /\s*<meta name="twitter:image"[^>]*>/,
];

// index.html is also the fallback for URLs that were not prerendered (blog posts, admin, typos).
// This clears the prerendered page right away when it belongs to a different URL.
const GUARD = `<script>(function(){var r=document.getElementById("root");var clean=function(p){return p.replace(/\\/+$/,"")||"/"};if(r&&clean(r.getAttribute("data-prerendered")||"")!==clean(location.pathname)){r.innerHTML="";r.removeAttribute("data-prerendered");}})();</script>`;

const languageOf = (urlPath) => {
  const match = urlPath.match(/^\/(es|pt)(?=\/|$)/);
  return match ? (match[1] === "es" ? "es" : "pt-BR") : "en-US";
};

async function main() {
  const started = Date.now();
  const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
  if (!template.includes('<div id="root"></div>')) {
    throw new Error("dist/index.html is already prerendered; run the full build (npm run build) instead");
  }
  const sitemap = await fs.readFile(path.join(root, "public", "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
  const { render } = await import(pathToFileURL(ssrEntry).href);

  let written = 0;
  const failed = [];
  const pages = urls.map((url) => ({ url, file: url }));
  for (const { url, file } of pages) {
    let rendered;
    try {
      rendered = await render(url, languageOf(url));
    } catch (error) {
      failed.push(url);
      console.error(`[prerender] skipped ${url}:`, error?.message ?? error);
      continue;
    }
    const { html, head, htmlLang } = rendered;
    let page = template;
    for (const tag of STATIC_HEAD_TAGS) page = page.replace(tag, "");
    page = page
      .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang}">`)
      .replace("</head>", `${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root" data-prerendered="${url}">${html}</div>${GUARD}`);
    if (file === "/") {
      // index.html is also served for every URL that has no file of its own (blog posts, /lp pages).
      // Keep the home text there but drop canonical and hreflang, so those URLs are never marked as
      // copies of the home page; the browser app adds the right tags for each URL.
      page = page.replace(/\s*<link[^>]*rel="(canonical|alternate)"[^>]*>/g, "");
    }
    const outFile = file === "/" ? path.join(dist, "index.html") : path.join(dist, file, "index.html");
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, page);
    // Hosts differ on how /pricing maps to a file: also write pricing.html next to pricing/index.html.
    if (file !== "/") await fs.writeFile(path.join(dist, `${file}.html`), page);
    written += 1;
  }
  console.log(`[prerender] ${written} pages written in ${Date.now() - started} ms${failed.length ? `, ${failed.length} FAILED: ${failed.join(", ")}` : ""}`);
}

main().catch((error) => {
  console.error("[prerender] FAILED, the site will be served without prerendered HTML:", error);
});
