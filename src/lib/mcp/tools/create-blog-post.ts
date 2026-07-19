import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getEnv } from "../env";

function supabaseForUser(ctx: ToolContext) {
  return createClient(getEnv("SUPABASE_URL"), getEnv("SUPABASE_PUBLISHABLE_KEY"), {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default defineTool({
  name: "create_blog_post",
  title: "Create blog post",
  description:
    "Create a new blog post. Provide title and content (Markdown or HTML). Slug is auto-generated from the title if omitted. Set status='published' to publish immediately (published_at is set to now); otherwise it stays as draft. Requires admin (RLS).",
  inputSchema: {
    title: z.string().min(3).describe("Post title."),
    content: z.string().min(10).describe("Full post body (Markdown or HTML)."),
    slug: z.string().optional().describe("URL slug. Auto-generated from title if omitted."),
    excerpt: z.string().optional().describe("Short summary shown in listings."),
    cover_image: z.string().url().optional().describe("Cover image URL."),
    category_id: z.string().uuid().optional(),
    author: z.string().optional(),
    status: z.enum(["draft", "published"]).optional().describe("Default 'draft'."),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    read_time: z.number().int().min(1).max(120).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const status = input.status ?? "draft";
    const slug = input.slug?.trim() || slugify(input.title);
    const row = {
      title: input.title,
      slug,
      content: input.content,
      excerpt: input.excerpt,
      cover_image: input.cover_image,
      category_id: input.category_id,
      author: input.author,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      meta_title: input.meta_title,
      meta_description: input.meta_description,
      read_time: input.read_time,
    };
    const { data, error } = await supabaseForUser(ctx)
      .from("blog_posts")
      .insert(row)
      .select()
      .single();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { post: data },
    };
  },
});
