import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Some preview/build environments occasionally fail to inject VITE_* variables.
// To prevent a blank-screen crash, we fall back to the known Cloud backend values.
// (These are publishable client values; they are already safe to be shipped to browsers.)

const FALLBACK_PROJECT_ID = "atbvffcnrgxeegclaqeb";
const FALLBACK_URL = `https://${FALLBACK_PROJECT_ID}.supabase.co`;
const FALLBACK_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YnZmZmNucmd4ZWVnY2xhcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTU1MTgsImV4cCI6MjA3NzU3MTUxOH0.2tqtQRH6tSxciBHmn9mXq9kx4ozs-L7vyiAwf2I0KIQ";

const projectId = (import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined)?.trim();
const urlFromEnv = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const keyFromEnv = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim();

const resolvedUrl = urlFromEnv || (projectId ? `https://${projectId}.supabase.co` : FALLBACK_URL);
const resolvedKey = keyFromEnv || FALLBACK_PUBLISHABLE_KEY;

if (!urlFromEnv || !keyFromEnv) {
  // Avoid throwing at import time (blank-screen). Log once for diagnosis.
  // Note: We intentionally do NOT print the key.
  console.warn(
    "Backend env vars were not injected (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY). Falling back to bundled defaults."
  );
}

let storage: Storage | undefined;
try {
  storage = typeof window !== "undefined" ? window.localStorage : undefined;
} catch {
  storage = undefined;
}

export const supabase = createClient<Database>(resolvedUrl, resolvedKey, {
  auth: {
    storage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
