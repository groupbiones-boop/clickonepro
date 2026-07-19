/**
 * Front-end error logger.
 * - Captura window.error, unhandledrejection e erros de React (via ErrorBoundary).
 * - Loga no console com contexto (rota, UA, timestamp).
 * - Persiste os últimos 20 erros em localStorage sob `__clickone_errors`
 *   pra você inspecionar depois de uma blank screen:
 *     JSON.parse(localStorage.getItem('__clickone_errors') || '[]')
 */

const STORAGE_KEY = "__clickone_errors";
const MAX_ENTRIES = 20;

export type LoggedError = {
  timestamp: string;
  type: "window.error" | "unhandledrejection" | "react" | "manual";
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  url: string;
  userAgent: string;
  componentStack?: string;
};

function persist(entry: LoggedError) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: LoggedError[] = raw ? JSON.parse(raw) : [];
    list.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
  } catch {
    // storage cheio / bloqueado — ignorar
  }
}

async function reportToSentry(entry: LoggedError) {
  if (!import.meta.env.VITE_SENTRY_DSN) return;
  try {
    const { Sentry } = await import("./sentry");
    Sentry.captureMessage(`[${entry.type}] ${entry.message}`, {
      level: "error",
      extra: entry as unknown as Record<string, unknown>,
    });
  } catch {
    // Sentry indisponível — ignorar
  }
}

export function logError(
  input: Partial<LoggedError> & Pick<LoggedError, "type" | "message">,
) {
  const entry: LoggedError = {
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    ...input,
  };
  // Console visível em produção também (não usa console.debug)
  console.error(`[app-error:${entry.type}]`, entry);
  persist(entry);
}

let installed = false;

export function installGlobalErrorLogger() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    logError({
      type: "window.error",
      message: event.message || String(event.error),
      stack: event.error?.stack,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    logError({
      type: "unhandledrejection",
      message:
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : JSON.stringify(reason),
      stack: reason instanceof Error ? reason.stack : undefined,
    });
  });

  // Helper acessível no console do navegador
  (window as unknown as { __getErrors: () => LoggedError[] }).__getErrors = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };
}

export function clearErrorLog() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
