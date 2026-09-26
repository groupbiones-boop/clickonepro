/// <reference types="vite/client" />

interface Window {
  /** Google tag (GA4), loaded in index.html. */
  gtag?: (...args: unknown[]) => void;
}
