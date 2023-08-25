<script>
	import { goto } from '$app/navigation';
	import { sendResetPasswordMail, signInUser } from '$lib/models/user';
	import toast from 'svelte-french-toast';

	let email = '';
	let password = '';

	function handleSubmit() {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			signInUser({ email, password })
				.then((res) => goto('/'))
				.catch((e) => {
					console.log(e);
					if (e.message == 'Invalid login credentials') {
						toast.error('Invalid password');
					}
				});
		} else {
			toast.error('Invalid Email!');
		}
	}

	function handleResetPass() {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			sendResetPasswordMail(email);
		} else {
			toast.error('Invalid Email!');
		}
	}
</script>

<div class="h-screen flex items-center justify-center">
	<form
		style="min-width: 30vw"
		class="flex flex-col gap-4 border px-8 py-16 rounded-xl"
		on:submit={handleSubmit}
	>
		<h1 class="text-3xl font-bold text-center">Login</h1>
		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				required
				type="email"
				placeholder="Enter your email"
				class="input input-bordered w-full"
				bind:value={email}
			/>
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Password</span>
			</label>
			<input
				required
				type="password"
				placeholder="Enter your password"
				class="input input-bordered w-full"
				bind:value={password}
			/>
		</div>
		<button
			class="btn btn-link"
			on:click={() => {
				toast.promise(
					sendResetPasswordMail(email),
					{
						loading: 'Sending email...',
						success: 'Email sent!',
						error: 'Error sending email'
					},
					{
						success: {
							duration: 3000
						},
						error: {
							duration: 3000
						}
					}
				);
			}}
			type="button">Forgot password?</button
		>
		<button class="btn" type="submit">Login</button>
	</form>
</div>
