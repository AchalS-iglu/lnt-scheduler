import { SUPABASE_SERVICE_ACCOUNT } from '$env/static/private';
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_KEY
	{
		auth: {
			autoRefreshToken: true,
			persistSession: false
		}
	}
);

export const supabaseAdmin = createClient(
	PUBLIC_SUPABASE_URL,
	SUPABASE_SERVICE_ACCOUNT
);
