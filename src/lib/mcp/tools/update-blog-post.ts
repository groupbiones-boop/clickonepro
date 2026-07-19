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
  name: "update_blog_post",
  title: "Update blog post",
  description:
    "Update an existing blog post by id or current slug. Any field (title, slug, content, excerpt, cover_image, meta_*, read_time) may be omitted to keep the current value. Toggle publish state with status='draft'|'published' — switching to 'published' sets published_at=now if it was empty; switching to 'draft' clears published_at. Requires admin (RLS).",
  inputSchema: {
    id: z.string().uuid().optional().describe("Post id. Provide id OR slug."),
    slug: z.string().optional().describe("Current slug. Provide id OR slug."),
    title: z.string().min(3).optional(),
    new_slug: z.string().optional().describe("New URL slug. If omitted, slug is unchanged."),
    content: z.string().min(10).optional(),
    excerpt: z.string().optional(),
    cover_image: z.string().url().optional(),
    category_id: z.string().uuid().optional(),
    author: z.string().optional(),
    status: z.enum(["draft", "published"]).optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    read_time: z.number().int().min(1).max(120).optional(),
    regenerate_slug_from_title: z.boolean().optional().describe("If true and new_slug omitted, regenerate slug from the (new or existing) title."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (!input.id && !input.slug) {
      return { content: [{ type: "text", text: "Provide either id or slug." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);

    // Load current row
    const q = supabase.from("blog_posts").select("*").limit(1);
    const { data: existing, error: fetchErr } = input.id
      ? await q.eq("id", input.id).maybeSingle()
      : await q.eq("slug", input.slug!).maybeSingle();

    if (fetchErr) return { content: [{ type: "text", text: fetchErr.message }], isError: true };
    if (!existing) return { content: [{ type: "text", text: "Post not found." }], isError: true };

    const patch: Record<string, unknown> = {};
    if (input.title !== undefined) patch.title = input.title;
    if (input.content !== undefined) patch.content = input.content;
    if (input.excerpt !== undefined) patch.excerpt = input.excerpt;
    if (input.cover_image !== undefined) patch.cover_image = input.cover_image;
    if (input.category_id !== undefined) patch.category_id = input.category_id;
    if (input.author !== undefined) patch.author = input.author;
    if (input.meta_title !== undefined) patch.meta_title = input.meta_title;
    if (input.meta_description !== undefined) patch.meta_description = input.meta_description;
    if (input.read_time !== undefined) patch.read_time = input.read_time;

    if (input.new_slug) {
      patch.slug = input.new_slug.trim();
    } else if (input.regenerate_slug_from_title) {
      patch.slug = slugify(input.title ?? existing.title);
    }

    if (input.status !== undefined && input.status !== existing.status) {
      patch.status = input.status;
      if (input.status === "published") {
        if (!existing.published_at) patch.published_at = new Date().toISOString();
      } else {
        patch.published_at = null;
      }
    }

    if (Object.keys(patch).length === 0) {
      return { content: [{ type: "text", text: "No changes provided." }], isError: true };
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(patch)
      .eq("id", existing.id)
      .select()
      .single();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { post: data, changed_fields: Object.keys(patch) },
    };
  },
});
