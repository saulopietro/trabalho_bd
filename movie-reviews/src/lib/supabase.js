import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqjztdrhjfqqyrlptfpw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxanp0ZHJoamZxcXlybHB0ZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDQ1MzUsImV4cCI6MjA3MzY4MDUzNX0.MdiiYrt4CXDkWFvTyFFo8xR91NQ9qtRHzW4zD7cP4Vk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)