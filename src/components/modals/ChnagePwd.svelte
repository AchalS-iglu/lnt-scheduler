<script>
	import { closeModal } from '$lib/utils';
	import toast from 'svelte-french-toast';
	import IconButton from '../IconButton.svelte';
	import { supabase } from '$lib/supabase/client';

	let pass = '';
	let confirmPass = '';

	const handleSubmit = () => {
		if (pass === confirmPass) {
			toast
				.promise(
					supabase.auth.updateUser({
						password: pass
					}),
					{
						loading: 'Changing password...',
						success: 'Password changed successfully',
						error: 'Failed to change password'
					}
				)
				.then(() => {
					closeModal();
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			toast.error('Passwords do not match');
		}
	};
</script>

<for class="header">
	<span class="heading"> Change Password </span>
	<IconButton on:click={closeModal}>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	</IconButton>
</for>
<form class="flex flex-col gap-4" on:submit={handleSubmit}>
	<div class="flex flex-col gap-4">
		<div class="form-control w-full">
			<label class="label" for="pass">
				<span class="label-text">New Password</span>
			</label>
			<input
				type="password"
				placeholder="Enter your password"
				class="input input-bordered w-full"
				bind:value={pass}
			/>
		</div>
		<div class="form-control w-full">
			<label class="label" for="confirmPass">
				<span class="label-text">Confirm New Password</span>
			</label>
			<input
				type="password"
				placeholder="Enter your password"
				class="input input-bordered w-full"
				bind:value={confirmPass}
			/>
		</div>
	</div>
	<button class="btn btn-neutral self-center w-fit" type="submit">
		<span class="btn-text">Change Password</span>
	</button>
</form>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 0.5rem;

		.heading {
			font-size: 1.1rem;
			font-weight: 600;
			line-height: 1.25rem;
		}
	}
</style>
