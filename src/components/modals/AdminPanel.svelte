<script>
	import { closeModal } from '$lib/utils';
	import IconButton from '../IconButton.svelte';

	/**
	 * @type {string | null}
	 */
	let editingUser = 'uid';
	/**
	 * @type {boolean}
	 */
	let newUser = true;
	let newUserFields = {
		name: '',
		email: '',
		role: 'user'
	};
</script>

<div class="header">
	<div class="flex gap-4 items-center">
		<span class="heading">Admin Panel</span>
		<button class="btn btn-sm btn-neutral">Add User</button>
	</div>
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
</div>
<div class="grid gap-4 px-2 items-center" style="grid-template-columns: 1fr 1fr 1fr max-content;">
	<div>Name</div>
	<div>Email</div>
	<div>Role</div>
	<div class="flex gap-2">Actions</div>
	<div>Name</div>
	<div>Email</div>
	<div>Role</div>
	<div class="flex gap-2">
		<button class="btn btn-sm btn-success">Edit</button>
		<button class="btn btn-sm btn-error">Delete</button>
	</div>
	{#if editingUser === 'bruh'}
		<div>
			<input type="text" class="input input-sm w-full" />
		</div>
		<div>
			<input type="email" class="input input-sm w-full" />
		</div>
		<div>
			<select class="select select-sm w-full">
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select>
		</div>
		<div class="flex gap-2">
			<button class="btn btn-sm btn-success">Save</button>
			<button class="btn btn-sm btn-error">Cancel</button>
		</div>
	{/if}
	{#if newUser}
		<div>
			<input type="text" class="input input-sm w-full" bind:value={newUserFields.name} />
		</div>
		<div>
			<input type="email" class="input input-sm w-full" bind:value={newUserFields.email} />
		</div>
		<div>
			<select class="select select-sm w-full" bind:value={newUserFields.role}>
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select>
		</div>
		<div class="flex gap-2">
			<button class="btn btn-sm btn-success">Save</button>
			<button class="btn btn-sm btn-error">Cancel</button>
		</div>
	{/if}
</div>

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
