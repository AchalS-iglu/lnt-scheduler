import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	'https://tyewgcygpmalauumkzwx.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZXdnY3lncG1hbGF1dW1rend4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2ODUwODUsImV4cCI6MjAwODI2MTA4NX0.EnGFNkerx63OpWB1im0i-aUK10bB223BcbzTNKn_9hM',
	{
		auth: {
			autoRefreshToken: true,
			persistSession: false
		}
	}
);

export const supabaseAdmin = createClient(
	'https://tyewgcygpmalauumkzwx.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZXdnY3lncG1hbGF1dW1rend4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjY4NTA4NSwiZXhwIjoyMDA4MjYxMDg1fQ.hxkBHNiGgS6bGhHhFiHvOS8B_VSdV0VKzIN3u98VgA4'
);
