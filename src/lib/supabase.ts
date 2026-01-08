import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Textbaustein = {
  id?: number
  textbaustein: string
  keywords: string[] // Will be stored as JSONB in database
  topic: string
  created_at?: string
}
