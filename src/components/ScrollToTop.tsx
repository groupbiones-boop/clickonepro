import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on page change. When the URL carries a hash (for example /#how-it-works),
 * it scrolls to that element instead, retrying briefly because pages are lazy loaded.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timer: number | undefined;

    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (attempts++ < 20) timer = window.setTimeout(tryScroll, 100);
    };

    tryScroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
