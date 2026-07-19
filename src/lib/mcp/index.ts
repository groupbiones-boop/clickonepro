import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPostsTool from "./tools/list-blog-posts";
import getBlogPostTool from "./tools/get-blog-post";
import listLeadsTool from "./tools/list-leads";
import getLeadTool from "./tools/get-lead";
import createLeadTool from "./tools/create-lead";
import updateLeadStatusTool from "./tools/update-lead-status";
import createBlogPostTool from "./tools/create-blog-post";
import updateBlogPostTool from "./tools/update-blog-post";
import previewBlogPostTool from "./tools/preview-blog-post";
import seoChecklistBlogPostTool from "./tools/seo-checklist-blog-post";
import scheduleBlogPostPublishTool from "./tools/schedule-blog-post-publish";
import scheduleDemoTool from "./tools/schedule-demo";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "clickonepro-mcp",
  title: "ClickOne Pro MCP",
  version: "0.6.0",
  instructions:
    "Tools for the ClickOne Pro CRM and blog. Blog (admin write): `list_blog_posts`, `get_blog_post`, `create_blog_post`, `update_blog_post`, `schedule_blog_post_publish`. Blog utilities (no auth needed): `preview_blog_post` renders Markdown→HTML and estimates read_time; `seo_checklist_blog_post` audits meta tags, headings and keyword density before saving. Leads (admin): `list_leads`, `get_lead`, `create_lead`, `update_lead_status`. Public: `schedule_demo` books a demo and emails a confirmation.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listBlogPostsTool,
    getBlogPostTool,
    createBlogPostTool,
    updateBlogPostTool,
    previewBlogPostTool,
    seoChecklistBlogPostTool,
    scheduleBlogPostPublishTool,
    listLeadsTool,
    getLeadTool,
    createLeadTool,
    updateLeadStatusTool,
    scheduleDemoTool,
  ],
});
