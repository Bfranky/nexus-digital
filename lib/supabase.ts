import { createBrowserClient } from "@supabase/ssr";

let clientInstance: ReturnType<typeof createBrowserClient> | null = null;

// Singleton — reuse one connection instead of creating a new one per save
export function createClient() {
  if (!clientInstance) {
    clientInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return clientInstance;
}

// Test the connection and table access — call this to diagnose issues
export async function testConnection(): Promise<{ ok: boolean; error?: string }> {
  try {
    const sb = createClient();
    const { error } = await sb
      .from("businesses")
      .select("id")
      .limit(1);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}