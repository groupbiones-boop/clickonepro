import { Navigate, useLocation, useParams } from "react-router-dom";
import { lazy } from "react";
import { INDUSTRY_URL_TO_KEY, industryPath } from "@/lib/site-routes";

const SetorDetalhe = lazy(() => import("@/pages/setores/SetorDetalhe"));

/** Old Portuguese URLs forward to their English equivalents, keeping query string and hash. */
export const LegacyRedirect = ({ to }: { to: string }) => {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace />;
};

/** /setores/encanamento -> /industries/plumbing */
export const LegacyIndustryRedirect = () => {
  const { slug = "" } = useParams();
  return <LegacyRedirect to={industryPath(slug)} />;
};

/** /industries/:slug with an English slug renders the page; an old Portuguese slug forwards to the English one. */
export const IndustryRoute = () => {
  const { slug = "" } = useParams();
  if (!(slug in INDUSTRY_URL_TO_KEY) && industryPath(slug) !== `/industries/${slug}`) {
    return <LegacyRedirect to={industryPath(slug)} />;
  }
  return <SetorDetalhe />;
};
