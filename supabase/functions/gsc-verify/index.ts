// Temporary utility to run GSC verification flow
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY")!;
const BASE = "https://connector-gateway.lovable.dev/google_search_console";
const H = {
  "Authorization": `Bearer ${LOVABLE_API_KEY}`,
  "X-Connection-Api-Key": GSC_KEY,
  "Content-Type": "application/json",
};

async function j(url: string, init: RequestInit = {}) {
  const r = await fetch(url, { ...init, headers: { ...H, ...(init.headers || {}) } });
  const t = await r.text();
  return { status: r.status, body: t };
}

Deno.serve(async (req) => {
  const { action, site = "https://clickonepro.com/" } = await req.json().catch(() => ({ action: "token" }));
  if (action === "token") {
    return Response.json(await j(`${BASE}/siteVerification/v1/token`, {
      method: "POST",
      body: JSON.stringify({ site: { identifier: site, type: "SITE" }, verificationMethod: "META" }),
    }));
  }
  if (action === "verify") {
    return Response.json(await j(`${BASE}/siteVerification/v1/webResource?verificationMethod=META`, {
      method: "POST",
      body: JSON.stringify({ site: { identifier: site, type: "SITE" } }),
    }));
  }
  if (action === "add_site") {
    return Response.json(await j(`${BASE}/webmasters/v3/sites/${encodeURIComponent(site)}`, { method: "PUT" }));
  }
  if (action === "submit_sitemap") {
    const sm = "https://clickonepro.com/sitemap.xml";
    return Response.json(await j(`${BASE}/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(sm)}`, { method: "PUT" }));
  }
  if (action === "list_sites") {
    return Response.json(await j(`${BASE}/webmasters/v3/sites`));
  }
  return new Response("unknown action", { status: 400 });
});
