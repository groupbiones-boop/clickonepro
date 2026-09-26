import { useTranslation } from "react-i18next";

/**
 * GHL (LeadConnector) booking calendar embed, wired to the "Demonstração - Clickone I.A" calendar.
 */
export const GHL_BOOKING_EMBED_URL: string = (import.meta.env.VITE_GHL_BOOKING_URL as string | undefined)?.trim() ?? "";

export const hasBookingCalendar = GHL_BOOKING_EMBED_URL.startsWith("https://");

interface BookingCalendarProps {
  /** Contact details already collected on the page; the GHL widget pre-fills its form with them. */
  prefill?: { firstName: string; lastName: string; email: string; phone: string };
}

const buildCalendarUrl = (prefill?: BookingCalendarProps["prefill"]) => {
  if (!prefill) return GHL_BOOKING_EMBED_URL;
  const url = new URL(GHL_BOOKING_EMBED_URL);
  url.searchParams.set("first_name", prefill.firstName);
  if (prefill.lastName) url.searchParams.set("last_name", prefill.lastName);
  url.searchParams.set("email", prefill.email);
  url.searchParams.set("phone", prefill.phone);
  return url.toString();
};

const BookingCalendar = ({ prefill }: BookingCalendarProps) => {
  const { t } = useTranslation();
  if (!hasBookingCalendar) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <iframe
        src={buildCalendarUrl(prefill)}
        title={t("bookDemoPage.badge")}
        className="block h-[760px] w-full border-0"
        loading="lazy"
        scrolling="yes"
      />
    </div>
  );
};

export default BookingCalendar;
