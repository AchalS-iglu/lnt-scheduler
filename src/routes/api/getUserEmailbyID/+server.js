// write a get user email by id supabase func

// Path: src/routes/api/getUserEmailbyID/+server.js
// Compare this snippet from src/lib/models/meeting.js:
import { supabaseAdmin } from '$lib/supabase/client';

export async function GET({ url }) {
	const id = url.searchParams.get('id');
	const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);
	if (error) {
		throw error;
	}
	if (data) {
		return new Response(data.user.email);
	}
}
