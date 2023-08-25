<script>
	import { getRooms } from '$lib/models/room';
	import { closeModal } from '$lib/utils';
	import { onMount } from 'svelte';

	import IconButton from '../IconButton.svelte';
	import toast from 'svelte-french-toast';
	import { MeetingStatus, createMeeting } from '$lib/models/meeting';
	import { userStore } from '$lib/stores';

	let form = {
		name: '',
		roomId: 'Select a room',
		desc: '',
		date: '',
		start: 0,
		end: 0,
		estimatedParticipants: 0,
		refreshments: false,
		lunch: false,
		vc: false,
		jobcode: ''
	};

	/**
	 * @type {import('$lib/models/room').Room_t[]}
	 */
	let rooms = [];
	onMount(async () => {
		rooms = await getRooms();
	});

	const handleSubmit = () => {
		console.log(form);
		const startTimestamp = new Date(`${form.date}T${form.start}:00`).getTime();
		const endTimestamp = new Date(`${form.date}T${form.end}:00`).getTime();
		const currentTime = new Date().getTime();

		if (startTimestamp < currentTime) {
			toast.error(
				'Please select a valid start time. The start time cannot be before the current time.',
				{
					duration: 5000
				}
			);
			return;
		} else if (
			endTimestamp < currentTime ||
			endTimestamp < startTimestamp ||
			endTimestamp === startTimestamp
		) {
			toast.error(
				'Please select a valid end time. The end time cannot be before the current time or the start time.',
				{
					duration: 5000
				}
			);
			return;
		}
		toast
			.promise(
				createMeeting({
					name: form.name,
					description: form.desc,
					start: startTimestamp,
					end: endTimestamp,
					roomId: form.roomId,
					userId: $userStore?.user.id ?? 'Unknown',
					participants: form.estimatedParticipants,
					refreshments: form.refreshments,
					lunch: form.lunch,
					vc: form.vc,
					jobcode: form.jobcode,
					status: MeetingStatus.PENDING
				}),
				{
					loading: 'Creating meeting...',
					success: 'Meeting created successfully!',
					error: 'Failed to create meeting'
				}
			)
			.then(() => {
				closeModal();
			});
	};
</script>

<div class="header">
	<span class="heading"> New Meeting </span>
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
<form class="flex flex-col gap-4" on:submit={handleSubmit}>
	<div class="grid gap-4" style="grid-template-columns: 1fr 1fr;">
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Title</span>
			</label>
			<input
				placeholder="Subject of the meetng"
				class="input input-bordered w-full"
				bind:value={form.name}
				required
			/>
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">VC Room</span>
			</label>
			<select class="select select-bordered w-full max-w-xs" bind:value={form.roomId}>
				<option disabled selected>Select a room</option>
				{#each rooms as room}
					<option value={room.id}>{room.name}</option>
				{/each}
			</select>
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Date</span>
			</label>
			<input type="date" class="input input-bordered w-full" bind:value={form.date} required />
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Estimated Participants</span>
			</label>
			<input
				type="number"
				class="input input-bordered w-full"
				bind:value={form.estimatedParticipants}
				min={0}
				required
			/>
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Start Time</span>
			</label>
			<input type="time" class="input input-bordered w-full" bind:value={form.start} required />
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">End Time</span>
			</label>
			<input type="time" class="input input-bordered w-full" bind:value={form.end} required />
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Jobcode</span>
			</label>
			<input
				type="text"
				placeholder="Enter the jobcode"
				class="input input-bordered w-full"
				bind:value={form.jobcode}
				required
			/>
		</div>
		<div class="form-control w-full">
			<label class="label" for="">
				<span class="label-text">Description</span>
			</label>
			<textarea
				placeholder="Enter a short description"
				class="textarea textarea-bordered w-full h-full"
				bind:value={form.desc}
				required
			/>
		</div>
		<div class="flex flex-row col-span-2">
			<div class="form-control w-full items-center">
				<label class="label" for="">
					<span class="label-text">Refreshments</span>
				</label>
				<input type="checkbox" class="toggle toggle-primary" bind:checked={form.refreshments} />
			</div>
			<div class="form-control w-full items-center">
				<label class="label" for="">
					<span class="label-text">Lunch</span>
				</label>
				<input type="checkbox" class="toggle toggle-primary" bind:checked={form.lunch} />
			</div>
			<div class="form-control w-full items-center">
				<label class="label" for="">
					<span class="label-text">Video Conferencing</span>
				</label>
				<input type="checkbox" class="toggle toggle-primary" bind:checked={form.vc} />
			</div>
		</div>
	</div>
	<button class="btn btn-neutral self-center w-fit" type="submit">Submit</button>
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
