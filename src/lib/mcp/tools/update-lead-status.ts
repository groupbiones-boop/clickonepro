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
  name: "update_lead_status",
  title: "Update lead status",
  description:
    "Update the status of an existing lead by id. Common values: 'new', 'contacted', 'qualified', 'converted', 'lost'. Requires admin access via RLS.",
  inputSchema: {
    id: z.string().uuid().describe("Lead UUID."),
    status: z.string().min(1).describe("New status value."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { lead: data },
    };
  },
});
