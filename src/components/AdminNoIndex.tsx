import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

/** Keeps every /admin route out of search engines (robots.txt also disallows /admin). */
const AdminNoIndex = () => {
  const { pathname } = useLocation();
  if (!pathname.startsWith("/admin")) return null;
  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
};

export default AdminNoIndex;
