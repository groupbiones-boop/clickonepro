import { useTranslation } from "react-i18next";

/**
 * GHL (LeadConnector) booking calendar embed, wired to the "Demonstração - Clickone I.A" calendar.
 */
export const GHL_BOOKING_EMBED_URL: string = (import.meta.env.VITE_GHL_BOOKING_URL as string | undefined)?.trim() ?? "";

export const hasBookingCalendar = GHL_BOOKING_EMBED_URL.startsWith("https://");

const BookingCalendar = () => {
  const { t } = useTranslation();
  if (!hasBookingCalendar) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <iframe
        src={GHL_BOOKING_EMBED_URL}
        title={t("bookDemoPage.badge")}
        className="block h-[760px] w-full border-0"
        loading="lazy"
        scrolling="yes"
      />
    </div>
  );
};

export default BookingCalendar;
