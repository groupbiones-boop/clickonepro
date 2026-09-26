import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { installGlobalErrorLogger } from "./lib/error-logger";
import ErrorBoundary from "./components/ErrorBoundary";
import { initSentry } from "./lib/sentry";

initSentry();

// Garantir que o site inicie sempre em modo claro
document.documentElement.classList.remove("dark");

// Captura window.error + unhandledrejection e persiste em localStorage
installGlobalErrorLogger();

const container = document.getElementById("root")!;
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Pages prerendered at build time (scripts/prerender.mjs) are hydrated; everything else renders fresh.
if (container.hasAttribute("data-prerendered") && container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
