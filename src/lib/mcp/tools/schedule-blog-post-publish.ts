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
  name: "schedule_blog_post_publish",
  title: "Schedule blog post publication",
  description:
    "Schedule a blog post to auto-publish at a future date. Sets status='draft' and published_at=<publish_at>. A backend cron job (every 5 minutes) flips status to 'published' once the scheduled time is reached. Pass `cancel: true` to cancel a schedule (clears published_at and keeps draft). Pass a past date to publish immediately. Requires admin (RLS).",
  inputSchema: {
    id: z.string().uuid().optional().describe("Post id. Provide id OR slug."),
    slug: z.string().optional().describe("Current slug. Provide id OR slug."),
    publish_at: z.string().datetime().optional().describe("ISO 8601 timestamp for auto-publish. Required unless cancel=true."),
    cancel: z.boolean().optional().describe("If true, clears the schedule and keeps the post as draft."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (!input.id && !input.slug) {
      return { content: [{ type: "text", text: "Provide either id or slug." }], isError: true };
    }
    if (!input.cancel && !input.publish_at) {
      return { content: [{ type: "text", text: "Provide publish_at (ISO 8601) or set cancel=true." }], isError: true };
    }

    const supabase = supabaseForUser(ctx);

    const q = supabase.from("blog_posts").select("id, title, slug, status, published_at").limit(1);
    const { data: existing, error: fetchErr } = input.id
      ? await q.eq("id", input.id).maybeSingle()
      : await q.eq("slug", input.slug!).maybeSingle();

    if (fetchErr) return { content: [{ type: "text", text: fetchErr.message }], isError: true };
    if (!existing) return { content: [{ type: "text", text: "Post not found." }], isError: true };

    let patch: Record<string, unknown>;
    let action: "scheduled" | "cancelled" | "published_now";

    if (input.cancel) {
      patch = { status: "draft", published_at: null };
      action = "cancelled";
    } else {
      const when = new Date(input.publish_at!);
      if (Number.isNaN(when.getTime())) {
        return { content: [{ type: "text", text: "Invalid publish_at (expected ISO 8601)." }], isError: true };
      }
      const now = new Date();
      if (when.getTime() <= now.getTime()) {
        patch = { status: "published", published_at: when.toISOString() };
        action = "published_now";
      } else {
        patch = { status: "draft", published_at: when.toISOString() };
        action = "scheduled";
      }
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(patch)
      .eq("id", existing.id)
      .select("id, title, slug, status, published_at, updated_at")
      .single();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const structured = {
      action,
      post: data,
      scheduled_for: action === "scheduled" ? data.published_at : null,
      note:
        action === "scheduled"
          ? "Post kept as draft. A cron job runs every 5 minutes and will flip it to 'published' at the scheduled time."
          : action === "published_now"
            ? "publish_at was in the past — the post is now published."
            : "Schedule cancelled. Post remains a draft with no scheduled publish time.",
    };

    return {
      content: [{ type: "text", text: JSON.stringify(structured, null, 2) }],
      structuredContent: structured,
    };
  },
});
