import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPostsTool from "./tools/list-blog-posts";
import getBlogPostTool from "./tools/get-blog-post";
import listLeadsTool from "./tools/list-leads";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "clickonepro-mcp",
  title: "ClickOne Pro MCP",
  version: "0.1.0",
  instructions:
    "Tools for the ClickOne Pro app. Use `list_blog_posts` and `get_blog_post` to read blog content. Use `list_leads` (admin-only) to inspect leads captured by the site.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listBlogPostsTool, getBlogPostTool, listLeadsTool],
});
