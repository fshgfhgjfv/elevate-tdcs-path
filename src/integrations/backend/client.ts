import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Some preview/build environments occasionally fail to inject VITE_SUPABASE_URL.
// We can safely reconstruct it from the project id (which is also injected).
const projectId = (import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined)?.trim();
const urlFromEnv = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const publishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim();

const resolvedUrl = urlFromEnv || (projectId ? `https://${projectId}.supabase.co` : "");

if (!resolvedUrl) {
  throw new Error(
    "Backend URL is missing (VITE_SUPABASE_URL). Refresh the preview; if it persists, verify Cloud backend is enabled."
  );
}

if (!publishableKey) {
  throw new Error(
    "Backend publishable key is missing (VITE_SUPABASE_PUBLISHABLE_KEY). Refresh the preview; if it persists, verify Cloud backend is enabled."
  );
}

let storage: Storage | undefined;
try {
  storage = typeof window !== "undefined" ? window.localStorage : undefined;
} catch {
  storage = undefined;
}

export const supabase = createClient<Database>(resolvedUrl, publishableKey, {
  auth: {
    storage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
