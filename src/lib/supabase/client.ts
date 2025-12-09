import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

export function createClient() {
    // Fallback for build time or missing env vars to prevent crash
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

    return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}
