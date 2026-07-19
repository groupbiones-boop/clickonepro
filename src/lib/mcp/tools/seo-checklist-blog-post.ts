import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STOP_WORDS = new Set([
  // pt-BR
  "a","o","as","os","um","uma","uns","umas","de","do","da","dos","das","em","no","na","nos","nas",
  "para","por","pelo","pela","com","sem","que","se","e","ou","mas","como","mais","menos","muito",
  "muita","muitos","muitas","ao","aos","à","às","ser","é","são","era","foi","ter","tem","têm",
  "há","seu","sua","seus","suas","meu","minha","nosso","nossa","este","esta","esse","essa","isso",
  "aquele","aquela","aquilo","não","sim","também","já","ainda","sobre","entre","até","quando",
  "onde","porque","porquê","pois",
  // en
  "the","a","an","and","or","but","if","then","of","in","on","at","to","for","with","without",
  "is","are","was","were","be","been","being","this","that","these","those","it","its","as","by",
  "from","into","about","over","under","between","not","no","yes","so","than","too","very","can",
  "will","just","also","have","has","had","do","does","did","you","your","we","our","they","their",
]);

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));
}

function extractHeadings(md: string) {
  const headings: { level: number; text: string }[] = [];
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const mMd = line.match(/^(#{1,6})\s+(.*)$/);
    if (mMd) { headings.push({ level: mMd[1].length, text: mMd[2].trim() }); continue; }
    const mHtml = line.match(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/i);
    if (mHtml) headings.push({ level: parseInt(mHtml[1], 10), text: stripHtml(mHtml[2]).trim() });
  }
  return headings;
}

function truncate(s: string, max: number) {
  const t = s.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut) + "…";
}

export default defineTool({
  name: "seo_checklist_blog_post",
  title: "SEO checklist for a blog post",
  description:
    "Analyze a draft post BEFORE saving and return an SEO checklist: suggested meta_title (≤60), meta_description (≤160), heading structure audit (single H1, hierarchy), top keywords with density, and pass/fail checks. Purely computational — does not touch the database.",
  inputSchema: {
    title: z.string().min(1),
    content: z.string().min(10).describe("Markdown or HTML."),
    excerpt: z.string().optional(),
    focus_keyword: z.string().optional().describe("Primary keyword to target. If omitted, the tool infers one from the title/content."),
    top_n_keywords: z.number().int().min(3).max(25).optional(),
  },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const headings = extractHeadings(input.content);
    const plain = stripHtml(input.content).replace(/\s+/g, " ").trim();
    const tokens = tokenize(`${input.title} ${plain}`);
    const totalWords = tokens.length;

    const freq = new Map<string, number>();
    for (const t of tokens) freq.set(t, (freq.get(t) ?? 0) + 1);
    const topN = input.top_n_keywords ?? 10;
    const top_keywords = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density_pct: totalWords ? +((count / totalWords) * 100).toFixed(2) : 0,
      }));

    const focus = (input.focus_keyword ?? top_keywords[0]?.keyword ?? "").toLowerCase();
    const focusTokens = tokenize(focus);
    const focusInTitle = focusTokens.length > 0 && focusTokens.every((t) => input.title.toLowerCase().includes(t));
    const focusInFirstParagraph = (() => {
      const first = plain.slice(0, 300).toLowerCase();
      return focusTokens.length > 0 && focusTokens.every((t) => first.includes(t));
    })();
    const focusEntry = top_keywords.find((k) => k.keyword === focus);
    const focus_density_pct = focusEntry?.density_pct ?? 0;

    const h1Count = headings.filter((h) => h.level === 1).length;
    const h2Count = headings.filter((h) => h.level === 2).length;

    // Hierarchy: no level jumps by more than 1 (e.g., H2 -> H4)
    let hierarchy_ok = true;
    let prev = 0;
    for (const h of headings) {
      if (prev > 0 && h.level > prev + 1) { hierarchy_ok = false; break; }
      prev = h.level;
    }

    // Suggestions
    const suggested_meta_title = truncate(
      focus && !input.title.toLowerCase().includes(focus) ? `${input.title} — ${focus}` : input.title,
      60,
    );
    const descBase = (input.excerpt?.trim() || plain).replace(/\s+/g, " ").trim();
    const suggested_meta_description = truncate(
      focus && !descBase.toLowerCase().includes(focus) ? `${focus}: ${descBase}` : descBase,
      160,
    );

    const checks = [
      { id: "title_length", label: "Title length 30–65 chars", pass: input.title.length >= 30 && input.title.length <= 65, detail: `${input.title.length} chars` },
      { id: "meta_title_length", label: "Suggested meta_title ≤ 60 chars", pass: suggested_meta_title.length <= 60, detail: `${suggested_meta_title.length} chars` },
      { id: "meta_description_length", label: "Suggested meta_description 120–160 chars", pass: suggested_meta_description.length >= 120 && suggested_meta_description.length <= 160, detail: `${suggested_meta_description.length} chars` },
      { id: "single_h1", label: "Exactly one H1", pass: h1Count === 1, detail: `H1 count: ${h1Count}` },
      { id: "has_h2", label: "At least 2 H2 sections", pass: h2Count >= 2, detail: `H2 count: ${h2Count}` },
      { id: "heading_hierarchy", label: "No heading-level jumps", pass: hierarchy_ok, detail: hierarchy_ok ? "ok" : "found level jump > 1" },
      { id: "min_words", label: "At least 300 words", pass: totalWords >= 300, detail: `${totalWords} content words` },
      { id: "focus_in_title", label: "Focus keyword appears in title", pass: focusInTitle, detail: focus || "(none)" },
      { id: "focus_in_intro", label: "Focus keyword appears in first paragraph", pass: focusInFirstParagraph, detail: focus || "(none)" },
      { id: "focus_density", label: "Focus keyword density 0.5–2.5%", pass: focus_density_pct >= 0.5 && focus_density_pct <= 2.5, detail: `${focus_density_pct}%` },
    ];

    const passed = checks.filter((c) => c.pass).length;
    const score = Math.round((passed / checks.length) * 100);

    const structured = {
      focus_keyword: focus || null,
      suggested_meta_title,
      suggested_meta_description,
      headings,
      stats: { total_words: totalWords, h1: h1Count, h2: h2Count, heading_count: headings.length },
      top_keywords,
      focus_density_pct,
      checks,
      score,
    };

    const text =
      `SEO checklist for "${input.title}"\n` +
      `Score: ${score}/100 (${passed}/${checks.length} checks passed)\n` +
      `Focus keyword: ${focus || "(none)"}  •  Density: ${focus_density_pct}%\n\n` +
      `Suggested meta_title  (${suggested_meta_title.length}/60): ${suggested_meta_title}\n` +
      `Suggested meta_desc   (${suggested_meta_description.length}/160): ${suggested_meta_description}\n\n` +
      `Headings (${headings.length}): H1=${h1Count}, H2=${h2Count}\n` +
      headings.map((h) => `  ${"#".repeat(h.level)} ${h.text}`).join("\n") +
      `\n\nTop keywords:\n` +
      top_keywords.map((k) => `  • ${k.keyword} — ${k.count} (${k.density_pct}%)`).join("\n") +
      `\n\nChecks:\n` +
      checks.map((c) => `  ${c.pass ? "✓" : "✗"} ${c.label} — ${c.detail}`).join("\n");

    return { content: [{ type: "text", text }], structuredContent: structured };
  },
});
