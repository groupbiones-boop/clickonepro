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

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description: "List blog posts from the ClickOne blog. Returns id, title, slug, status, published_at and views.",
  inputSchema: {
    status: z
      .enum(["draft", "published", "archived", "all"])
      .optional()
      .describe("Filter by post status. Defaults to published."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("blog_posts")
      .select("id, title, slug, status, published_at, views")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit ?? 20);
    if (!status || status !== "all") {
      query = query.eq("status", status ?? "published");
    }
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});
