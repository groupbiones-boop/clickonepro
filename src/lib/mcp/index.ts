import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPostsTool from "./tools/list-blog-posts";
import getBlogPostTool from "./tools/get-blog-post";
import listLeadsTool from "./tools/list-leads";
import getLeadTool from "./tools/get-lead";
import createLeadTool from "./tools/create-lead";
import updateLeadStatusTool from "./tools/update-lead-status";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "clickonepro-mcp",
  title: "ClickOne Pro MCP",
  version: "0.2.0",
  instructions:
    "Tools for the ClickOne Pro CRM and blog. Blog: `list_blog_posts`, `get_blog_post`. Leads (admin, RLS-enforced): `list_leads`, `get_lead`, `create_lead`, `update_lead_status`.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listBlogPostsTool,
    getBlogPostTool,
    listLeadsTool,
    getLeadTool,
    createLeadTool,
    updateLeadStatusTool,
  ],
});
