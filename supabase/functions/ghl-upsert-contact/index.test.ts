import {
  assertEquals,
  assertThrows,
  assertMatch,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  validate,
  normalizePhone,
  splitName,
  sanitize,
  isEmail,
  buildGhlPayload,
  buildNoteBody,
  buildAppointmentPayload,
} from "./index.ts";

// --- isEmail ---
Deno.test("isEmail: accepts valid, rejects invalid", () => {
  assertEquals(isEmail("a@b.co"), true);
  assertEquals(isEmail("bad"), false);
  assertEquals(isEmail(""), false);
  assertEquals(isEmail(123 as unknown), false);
});

// --- sanitize ---
Deno.test("sanitize: trims, strips <>, respects max length", () => {
  assertEquals(sanitize("  hi  "), "hi");
  assertEquals(sanitize("<script>x"), "scriptx");
  assertEquals(sanitize("abcdef", 3), "abc");
  assertEquals(sanitize(""), undefined);
  assertEquals(sanitize(null), undefined);
});

// --- normalizePhone ---
Deno.test("normalizePhone: strips formatting and enforces E.164", () => {
  assertEquals(normalizePhone("+1 (555) 123-4567"), "+15551234567");
  assertEquals(normalizePhone("15551234567"), "+15551234567");
  assertEquals(normalizePhone("+55 11 91234-5678"), "+5511912345678");
});

Deno.test("normalizePhone: rejects invalid formats", () => {
  assertEquals(normalizePhone("abc"), undefined);
  assertEquals(normalizePhone("123"), undefined); // too short
  assertEquals(normalizePhone("0123456789"), undefined); // leading zero
  assertEquals(normalizePhone(""), undefined);
});

// --- splitName ---
Deno.test("splitName: handles single, two, and multi-word names", () => {
  assertEquals(splitName(undefined), {});
  assertEquals(splitName("Ana"), { firstName: "Ana" });
  assertEquals(splitName("Ana Silva"), { firstName: "Ana", lastName: "Silva" });
  assertEquals(splitName("Ana Maria Silva Santos"), {
    firstName: "Ana",
    lastName: "Maria Silva Santos",
  });
  assertEquals(splitName("  João   da Silva  "), {
    firstName: "João",
    lastName: "da Silva",
  });
});

// --- validate ---
Deno.test("validate: happy path with all fields + UTMs", () => {
  const out = validate({
    name: "Ana Silva",
    email: "ana@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc",
    message: "Hello",
    source: "contact-page",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "launch",
    preferredDate: "2026-07-20",
    preferredTime: "14:30",
  });
  assertEquals(out.email, "ana@example.com");
  assertEquals(out.name, "Ana Silva");
  assertEquals(out.phone, "+15551234567");
  assertEquals(out.company, "Acme Inc");
  assertEquals(out.message, "Hello");
  assertEquals(out.source, "contact-page");
  assertEquals(out.utm_source, "google");
  assertEquals(out.utm_medium, "cpc");
  assertEquals(out.utm_campaign, "launch");
  assertEquals(out.preferredDate, "2026-07-20");
  assertEquals(out.preferredTime, "14:30");
});

Deno.test("validate: defaults source when omitted", () => {
  const out = validate({ email: "a@b.co" });
  assertEquals(out.source, "website-contact-form");
  assertEquals(out.phone, undefined);
  assertEquals(out.name, undefined);
});

Deno.test("buildAppointmentPayload: maps preferred date/time to calendar appointment", () => {
  const payload = buildAppointmentPayload("cal_123", "loc_123", "contact_123", {
    email: "ana@example.com",
    company: "Acme Inc",
    preferredDate: "2026-07-20",
    preferredTime: "14:30",
  });

  assertEquals(payload?.calendarId, "cal_123");
  assertEquals(payload?.locationId, "loc_123");
  assertEquals(payload?.contactId, "contact_123");
  assertEquals(payload?.startTime, "2026-07-20T14:30:00");
  assertEquals(payload?.title, "ClickOne Pro demo - Acme Inc");
  assertEquals(payload?.appointmentStatus, "new");
});

Deno.test("buildAppointmentPayload: returns undefined without date/time", () => {
  assertEquals(buildAppointmentPayload("cal_123", "loc_123", "contact_123", { email: "a@b.co" }), undefined);
});

Deno.test("validate: rejects missing/invalid email", () => {
  assertThrows(() => validate({}), Error, "Valid email required");
  assertThrows(() => validate({ email: "not-an-email" }), Error, "Valid email required");
  assertThrows(() => validate(null), Error, "Invalid body");
});

Deno.test("validate: rejects invalid phone but allows empty/missing", () => {
  assertThrows(
    () => validate({ email: "a@b.co", phone: "abc" }),
    Error,
    "Invalid phone format",
  );
  const noPhone = validate({ email: "a@b.co", phone: "" });
  assertEquals(noPhone.phone, undefined);
});

// --- buildGhlPayload ---
Deno.test("buildGhlPayload: maps fields to GHL canonical names", () => {
  const payload = buildGhlPayload("loc_123", {
    email: "ana@example.com",
    name: "Ana Silva Santos",
    phone: "+15551234567",
    company: "Acme Inc",
    source: "contact-page",
  });
  assertEquals(payload.locationId, "loc_123");
  assertEquals(payload.email, "ana@example.com");
  assertEquals(payload.firstName, "Ana");
  assertEquals(payload.lastName, "Silva Santos");
  assertEquals(payload.name, "Ana Silva Santos");
  assertEquals(payload.phone, "+15551234567");
  assertEquals(payload.companyName, "Acme Inc");
  assertEquals(payload.source, "contact-page");
  assertEquals(payload.tags, ["website-form"]);
});

Deno.test("buildGhlPayload: drops undefined keys to avoid nulling GHL fields", () => {
  const payload = buildGhlPayload("loc_123", {
    email: "a@b.co",
    source: "x",
  });
  assertEquals("phone" in payload, false);
  assertEquals("companyName" in payload, false);
  assertEquals("firstName" in payload, false);
  assertEquals("lastName" in payload, false);
  assertEquals("name" in payload, false);
});

// --- buildNoteBody ---
Deno.test("buildNoteBody: combines message + attribution", () => {
  const body = buildNoteBody({
    email: "a@b.co",
    message: "Preciso de ajuda",
    source: "contact-page",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "launch",
  });
  assertMatch(body!, /Message:\nPreciso de ajuda/);
  assertMatch(body!, /— Attribution —/);
  assertMatch(body!, /source: contact-page/);
  assertMatch(body!, /utm_source: google/);
  assertMatch(body!, /utm_medium: cpc/);
  assertMatch(body!, /utm_campaign: launch/);
});

Deno.test("buildNoteBody: message-only (no attribution header)", () => {
  const body = buildNoteBody({ email: "a@b.co", message: "Oi" });
  // source defaults may be absent when caller passes no source/UTMs
  assertMatch(body!, /Message:\nOi/);
});

Deno.test("buildNoteBody: returns undefined when nothing to note", () => {
  assertEquals(buildNoteBody({ email: "a@b.co" }), undefined);
});
