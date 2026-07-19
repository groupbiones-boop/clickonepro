import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { installGlobalErrorLogger } from "./lib/error-logger";
import ErrorBoundary from "./components/ErrorBoundary";

// Garantir que o site inicie sempre em modo claro
document.documentElement.classList.remove("dark");

// Captura window.error + unhandledrejection e persiste em localStorage
installGlobalErrorLogger();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
