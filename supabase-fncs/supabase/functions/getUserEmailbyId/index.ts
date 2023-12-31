// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import nodemailer from 'nodemailer';

console.log('Hello from Functions!');

serve(async (req) => {
	const { email, emailBody, subject } = await req.json();
	// const data = {
	// 	message: `Hello ${name}!`
	// };

	let transporter = nodemailer.createTransport({});

	transporter
		.sendMail({
			from: 'no-reply@lntscheduler.com',
			to: email.trim(),
			subject: subject,
			text: 'Kindly use HTML.',
			html: emailBody
		})
		.then((res) => {
			return new Response(
				JSON.stringify({
					status: 200,
					message: 'Message sent'
				})
			);
		})
		.catch((e) => {
			return new Response(
				JSON.stringify({
					error: e,
					message: 'Error occured',
					status: 500
				})
			);
		});
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
