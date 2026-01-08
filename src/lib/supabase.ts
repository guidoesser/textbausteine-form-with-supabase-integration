import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Debug logging for production
console.log('🔌 Supabase Client Init:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlLength: supabaseUrl.length,
  keyLength: supabaseAnonKey.length
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials!')
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING')
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Textbaustein = {
  id?: number
  textbaustein: string
  keywords: string[] // Will be stored as JSONB in database
  topic: string
  created_at?: string
}
