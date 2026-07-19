// ============================================
// GHL Field Mapping - Centralized configuration
// ============================================
// Maps ClickOne form fields to GoHighLevel canonical fields
// and derives source-based tags. Edit here to change mapping site-wide.

import { z } from "zod";

/** GHL canonical field names (v2 API contacts/upsert). */
export type GhlField =
  | "firstName"
  | "lastName"
  | "name"
  | "email"
  | "phone"
  | "companyName"
  | "source"
  | "note";

/**
 * Form field → GHL field mapping.
 * `name` is split into firstName/lastName by the edge function.
 * `message` is written to the contact note along with UTM attribution.
 */
export const GHL_FIELD_MAP: Record<string, GhlField> = {
  name: "name",
  email: "email",
  phone: "phone",
  company: "companyName",
  message: "note",
  source: "source",
};

/** Human-readable label per form field (for admin/debug UI). */
export const GHL_FIELD_LABELS: Record<string, string> = {
  name: "Nome completo",
  email: "Email",
  phone: "Telefone",
  company: "Empresa",
  message: "Mensagem (nota no CRM)",
  source: "Origem do lead",
};

// ============================================
// Validation (client-side, mirrors edge function)
// ============================================
const phoneRegex = /^\+?[1-9][\d\s().-]{7,20}$/;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(120),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(phoneRegex, "Telefone inválido (ex: +1 555 123 4567)")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ============================================
// Tag builder — attaches lead-source tags in GHL
// ============================================
export interface TagContext {
  /** Logical source of the form (e.g. "contact-page", "lp-perdendo-clientes"). */
  source?: string;
  /** Current page path, e.g. window.location.pathname. */
  path?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/** Normalize a string into a safe tag slug (lowercase, dashed). */
function slug(v: string): string {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Build the list of tags that will be attached to the GHL contact.
 * Always includes `website-form` plus contextual tags describing origin.
 */
export function buildLeadTags(ctx: TagContext): string[] {
  const tags = new Set<string>(["website-form"]);

  if (ctx.source) tags.add(`src-${slug(ctx.source)}`);
  if (ctx.path) tags.add(`page-${slug(ctx.path) || "root"}`);
  if (ctx.utm_source) tags.add(`utm-source-${slug(ctx.utm_source)}`);
  if (ctx.utm_medium) tags.add(`utm-medium-${slug(ctx.utm_medium)}`);
  if (ctx.utm_campaign) tags.add(`utm-campaign-${slug(ctx.utm_campaign)}`);

  return Array.from(tags);
}

/** Read UTMs from the current URL. */
export function readUTMs(): Pick<TagContext, "utm_source" | "utm_medium" | "utm_campaign"> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
  };
}
