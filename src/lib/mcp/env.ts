// Runtime env access for MCP tool handlers running inside the emitted Deno
// Supabase Edge Function. Import-safe: no top-level env reads.
declare const process: { env: Record<string, string | undefined> };

export const getEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
};
