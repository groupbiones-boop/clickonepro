/**
 * Sentry initialization.
 *
 * Ativo apenas em produção quando `VITE_SENTRY_DSN` está definido.
 * Configure o DSN em Workspace Settings → Build Secrets (ou variáveis de
 * ambiente do CI) para que o build inclua o monitoramento.
 */
import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const environment = import.meta.env.MODE;

export function initSentry() {
  if (!dsn || environment !== "production") return;

  Sentry.init({
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    release: import.meta.env.VITE_APP_VERSION as string | undefined,
  });
}

export { Sentry };
