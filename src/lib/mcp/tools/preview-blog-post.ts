import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

/**
 * Minimal, dependency-free Markdown → HTML renderer.
 * Handles headings, bold/italic, inline code, code fences, links, images,
 * blockquotes, unordered/ordered lists, horizontal rules, and paragraphs.
 * If the input already looks like HTML (starts with '<'), it's returned as-is.
 */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInline(text: string) {
  let s = escapeHtml(text);
  // images ![alt](url)
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_m, alt, url, title) => `<img src="${url}" alt="${alt}"${title ? ` title="${title}"` : ""} />`);
  // links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_m, t, url, title) => `<a href="${url}"${title ? ` title="${title}"` : ""}>${t}</a>`);
  // inline code
  s = s.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`);
  // bold ** or __
  s = s.replace(/(\*\*|__)(.+?)\1/g, "<strong>$2</strong>");
  // italic * or _
  s = s.replace(/(^|[\s(])(\*|_)([^*_\n]+)\2/g, "$1<em>$3</em>");
  return s;
}

function renderMarkdown(md: string): string {
  if (/^\s*<[a-zA-Z!]/.test(md)) return md; // already HTML
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let inList: "ul" | "ol" | null = null;
  const closeList = () => { if (inList) { out.push(`</${inList}>`); inList = null; } };

  while (i < lines.length) {
    const line = lines[i];
    // fenced code
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      closeList();
      const lang = fence[1] || "";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; // consume closing fence
      out.push(`<pre><code${lang ? ` class="language-${lang}"` : ""}>${escapeHtml(buf.join("\n"))}</code></pre>`);
      continue;
    }
    if (/^\s*$/.test(line)) { closeList(); i++; continue; }
    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { closeList(); out.push(`<h${h[1].length}>${renderInline(h[2])}</h${h[1].length}>`); i++; continue; }
    // hr
    if (/^\s*(?:---|\*\*\*|___)\s*$/.test(line)) { closeList(); out.push("<hr />"); i++; continue; }
    // blockquote
    if (/^>\s?/.test(line)) {
      closeList();
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      out.push(`<blockquote>${renderInline(buf.join(" "))}</blockquote>`);
      continue;
    }
    // unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      if (inList !== "ul") { closeList(); out.push("<ul>"); inList = "ul"; }
      out.push(`<li>${renderInline(line.replace(/^\s*[-*+]\s+/, ""))}</li>`);
      i++; continue;
    }
    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      if (inList !== "ol") { closeList(); out.push("<ol>"); inList = "ol"; }
      out.push(`<li>${renderInline(line.replace(/^\s*\d+\.\s+/, ""))}</li>`);
      i++; continue;
    }
    // paragraph — collapse consecutive non-empty lines
    closeList();
    const buf: string[] = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6}\s|>|```|\s*[-*+]\s+|\s*\d+\.\s+)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    out.push(`<p>${renderInline(buf.join(" "))}</p>`);
  }
  closeList();
  return out.join("\n");
}

function stripHtml(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(plainText: string, wpm = 220) {
  const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  return { words, read_time_minutes: Math.max(1, Math.round(words / wpm)) };
}

export default defineTool({
  name: "preview_blog_post",
  title: "Preview blog post",
  description:
    "Render a blog post preview WITHOUT saving. Converts Markdown to HTML (or passes HTML through), returns a plain-text excerpt, word count, and estimated read time (minutes). Use before `create_blog_post` or `update_blog_post` to review output. `intended_status` and `intended_slug` are echoed back so agents can chain into a save call.",
  inputSchema: {
    title: z.string().min(1),
    content: z.string().min(1).describe("Markdown or HTML."),
    excerpt: z.string().optional(),
    intended_status: z.enum(["draft", "published"]).optional(),
    intended_slug: z.string().optional(),
    words_per_minute: z.number().int().min(80).max(400).optional().describe("Reading speed (default 220 wpm)."),
  },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const html = renderMarkdown(input.content);
    const plain = stripHtml(html);
    const { words, read_time_minutes } = estimateReadTime(plain, input.words_per_minute ?? 220);
    const auto_excerpt = input.excerpt?.trim() || (plain.length > 200 ? plain.slice(0, 200).trim() + "…" : plain);
    const characters = plain.length;

    const preview = {
      title: input.title,
      intended_status: input.intended_status ?? "draft",
      intended_slug: input.intended_slug,
      html,
      plain_text: plain,
      excerpt: auto_excerpt,
      stats: { words, characters, read_time_minutes },
    };

    return {
      content: [
        {
          type: "text",
          text:
            `Preview of "${input.title}"\n` +
            `Status (intended): ${preview.intended_status}\n` +
            `Slug (intended): ${preview.intended_slug ?? "(auto from title)"}\n` +
            `Words: ${words} • Read time: ~${read_time_minutes} min\n\n` +
            `Excerpt: ${auto_excerpt}\n\n` +
            `--- HTML ---\n${html}`,
        },
      ],
      structuredContent: preview,
    };
  },
});
