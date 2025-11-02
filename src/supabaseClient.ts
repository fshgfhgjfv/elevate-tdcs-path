import { createClient } from '@supabase/supabase-js'

// Get the variables from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Safety check to make sure you've added the variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Anon Key. Check your .env.local file.")
}

// Create and export the client
export const supabase = createClient(supabaseUrl, supabaseKey)