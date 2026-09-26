import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders its children only in the browser, after the first paint. Used for tracking widgets that read
 * window/document while rendering, so the build-time prerender and hydration both skip them.
 */
const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : null;
};

export default ClientOnly;
