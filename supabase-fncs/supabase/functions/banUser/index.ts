// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from '@supabase/supabase-js';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

console.log('Hello from Functions!');

serve(async (req) => {
	const { userId } = await req.json();
	// const data = {
	// 	message: `Hello ${name}!`
	// };

	const supabaseClient = createClient(
		// Supabase API URL - env var exported by default.
		Deno.env.get('SUPABASE_URL') ?? '',
		// Supabase API ANON KEY - env var exported by default.
		Deno.env.get('SUPABASE_ANON_KEY') ?? '',
		// Create client with Auth context of the user that called the function.
		// This way your row-level-security (RLS) policies are applied.
		{ global: { headers: { Authorization: req.headers.get('Authorization')! } } }
	);
	// Now we can get the session or user object
	const {
		data: { user }
	} = await supabaseClient.auth.getUser();

	if (user?.role !== 'Admin') {
		return new Response(
			JSON.stringify({
				status: 401,
				message: 'Unauthorized'
			})
		);
	}

	const resAuth = await supabaseClient.auth.admin.updateUserById(userId, {
		ban_duration: '99999h'
	});

	if (resAuth.error) {
		return new Response(
			JSON.stringify({
				status: 500,
				message: 'Error occured'
			})
		);
	}

	return new Response(
		JSON.stringify({
			status: 200,
			message: 'User banned'
		})
	);
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
