
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://tyewgcygpmalauumkzwx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZXdnY3lncG1hbGF1dW1rend4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2ODUwODUsImV4cCI6MjAwODI2MTA4NX0.EnGFNkerx63OpWB1im0i-aUK10bB223BcbzTNKn_9hMs', {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    }
})