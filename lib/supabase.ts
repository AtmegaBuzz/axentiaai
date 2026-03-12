import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * A lightweight Supabase client that works in both server and client contexts.
 * For server-only usage (API routes), import this directly.
 * For client components, use createBrowserClient from @supabase/ssr instead.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
