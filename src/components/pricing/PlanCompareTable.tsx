import { useTranslation } from "react-i18next";
import { Check, Minus } from "lucide-react";

interface CompareRow {
  label: string;
  recover: string;
  frontOffice: string;
}

const asRows = (value: unknown): CompareRow[] => (Array.isArray(value) ? (value as CompareRow[]) : []);

/**
 * Side by side comparison of Recover and Front Office.
 * Cells hold either "yes", "no" or a short text value (see `plans.compare.rows`).
 */
export const PlanCompareTable = () => {
  const { t } = useTranslation();
  const rows = asRows(t("plans.compare.rows", { returnObjects: true }));

  const renderCell = (value: string) => {
    if (value === "yes") {
      return (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="sr-only">{t("plans.compare.yes")}</span>
        </span>
      );
    }
    if (value === "no") {
      return (
        <span className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground">
          <Minus className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t("plans.compare.no")}</span>
        </span>
      );
    }
    return <span className="text-xs sm:text-sm font-medium text-foreground">{value}</span>;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className="relative overflow-x-auto rounded-3xl border border-border bg-card shadow-sm"
        role="region"
        aria-label={t("plans.compare.title")}
        tabIndex={0}
      >
        <table className="w-full min-w-[320px] border-collapse text-left" data-testid="plan-compare-table">
          <caption className="sr-only">{t("plans.compare.title")}</caption>
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th scope="col" className="sticky left-0 z-10 bg-muted px-4 sm:px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("plans.compare.featureHeader")}
              </th>
              <th scope="col" className="w-[30%] px-2 sm:px-5 py-4 text-center text-sm sm:text-base font-bold text-foreground">
                {t("plans.recover.name")}
              </th>
              <th scope="col" className="w-[30%] bg-primary/5 px-2 sm:px-5 py-4 text-center text-sm sm:text-base font-bold text-primary">
                {t("plans.frontOffice.name")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border/60 last:border-b-0">
                <th scope="row" className="sticky left-0 z-10 w-[40%] bg-card px-3 sm:px-5 py-3.5 text-xs sm:text-sm font-medium text-foreground shadow-[1px_0_0_hsl(var(--border))]">
                  {row.label}
                </th>
                <td className="px-2 sm:px-5 py-3.5 text-center">{renderCell(row.recover)}</td>
                <td className="bg-primary/5 px-2 sm:px-5 py-3.5 text-center">{renderCell(row.frontOffice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanCompareTable;
