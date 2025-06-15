
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mlznhcbqcljhfbhksdtm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sem5oY2JxY2xqaGZiaGtzZHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTYzNjEsImV4cCI6MjA2NTU5MjM2MX0.i03MVL21Wcl0inwZloqWeLmO4jx793zBrfjqfyNlCpE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
