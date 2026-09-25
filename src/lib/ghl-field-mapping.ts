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
/**
 * Normalizes a phone number to E.164.
 * Accepts "(770) 501-7321", "770-501-7321", "7705017321", "1 770 501 7321" and "+1 770 501 7321".
 * 10 digits are treated as US numbers (+1). Returns null when the number is not valid.
 */
export function normalizePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const hasPlus = trimmed.startsWith("+");
  if (/[^\d\s().+-]/.test(trimmed)) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (!hasPlus && digits.length === 10 && /^[2-9]/.test(digits)) return `+1${digits}`;
  if (!hasPlus && digits.length === 11 && digits.startsWith("1") && /^1[2-9]/.test(digits)) return `+${digits}`;
  if (hasPlus && /^[1-9]\d{7,14}$/.test(digits)) return `+${digits}`;
  return null;
}

/**
 * Validation messages are translation keys under `contactForm.errors.*`,
 * so the form shows them in the visitor's language.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "nameTooShort").max(120, "nameTooLong"),
  email: z.string().trim().email("invalidEmail").max(255, "invalidEmail"),
  phone: z
    .string()
    .trim()
    .max(40, "invalidPhone")
    .refine((v) => v === "" || normalizePhone(v) !== null, "invalidPhone")
    .transform((v) => (v === "" ? "" : (normalizePhone(v) as string))),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;

// ============================================
// Tag builder: attaches lead-source tags in GHL
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
