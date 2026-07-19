// Ambient types for MCP tool files bundled into a Deno Supabase Edge Function.
// `process.env` is only available at runtime inside the emitted function.
declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL?: string;
    SUPABASE_PUBLISHABLE_KEY?: string;
    SUPABASE_ANON_KEY?: string;
  }
  interface Process {
    env: ProcessEnv;
  }
}
declare const process: NodeJS.Process;
