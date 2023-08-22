<script>
	import { closeModal } from '$lib/utils';

	import IconButton from '../IconButton.svelte';
</script>

<div class="header">
	<span class="heading"> New Task </span>
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
<div class="flex flex-col gap-4">
	<div class="grid gap-4" style="grid-template-columns: 1fr 1fr;">
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Name</span>
			</label>
			<input type="email" placeholder="Enter your email" class="input input-bordered w-full" />
		</div>
		<div class="form-control w-full">
            <label class="label" for="">
				<span class="label-text">Name</span>
			</label>
			<select class="select select-bordered w-full max-w-xs">
				<option disabled selected>Who shot first?</option>
				<option>Han Solo</option>
				<option>Greedo</option>
			</select>
		</div>
	</div>
    <button class="btn btn-neutral self-center w-fit">Login</button>
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
