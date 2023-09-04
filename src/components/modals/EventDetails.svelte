<script>
	import { MeetingStatus, updateMeetingStatus } from '$lib/models/meeting';
	import { meetingsStore, modalStore, userStore } from '$lib/stores';
	import { closeModal } from '$lib/utils';
	import { onMount } from 'svelte';

	import IconButton from '../IconButton.svelte';
	import { getUserbyId } from '$lib/models/user';
	import { getRoombyId } from '$lib/models/room';
	import toast from 'svelte-french-toast';

	/**
	 * @type {import('$lib/models/meeting').Meeting | undefined}
	 */
	let meetingDetails = $modalStore?.props?.meeting ?? undefined;

	/**
	 * @type {any}
	 */
	let meetingUser;
	/**
	 * @type {string}
	 */
	let roomName;
	$: meetingDetails?.roomId &&
		getRoombyId(meetingDetails.roomId).then((res) => {
			roomName = res.name;
		});
	$: meetingDetails?.userId &&
		getUserbyId(meetingDetails.userId).then((res) => {
			meetingUser = res[0]?.name ?? 'Unknown';
		});
</script>

<div class="header">
	<div class="heading">
		<span>Meeting Details</span>
		<div class="flex gap-1 items-center">
			<span class="text-xs font-medium">Created At -</span>
			<span class="text-xs font-normal"
				>{meetingDetails ? new Date(meetingDetails.created_at).toLocaleString() : ''}</span
			>
		</div>
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
<div class="flex flex-col gap-6 px-4">
	{#if meetingDetails}
		<div class="flex items-center justify-center gap-2">
			<div class="flex flex-col gap-2 border rounded-lg w-fit px-4 py-2 font-medium">
				<span class="text-sm">{new Date(meetingDetails.start).toLocaleString()}</span>
			</div>
			<div class="border-t border-b w-1/5" />
			<div class="flex flex-col gap-2 border rounded-lg w-fit px-4 py-2 font-medium">
				<span class="text-sm">{new Date(meetingDetails.end).toLocaleString()}</span>
			</div>
		</div>
		<div class="grid gap-y-2 gap-x-4" style="grid-template-columns: max-content 1fr;">
			<span class="text-sm font-semibold">Name</span>
			<span class="text-sm">{meetingDetails.name}</span>
			<span class="text-sm font-semibold">Description</span>
			<span class="text-sm">{meetingDetails.description}</span>
			<span class="text-sm font-semibold">Room</span>
			<span class="text-sm">{roomName}</span>
			<span class="text-sm font-semibold">User</span>
			<span class="text-sm">{meetingUser}</span>
			<span class="text-sm font-semibold">Participants</span>
			<span class="text-sm">{meetingDetails.participants}</span>
			<span class="text-sm font-semibold">Refreshments</span>
			<span class="text-sm">{meetingDetails.refreshments ? 'Yes' : 'No'}</span>
			<span class="text-sm font-semibold">Lunch</span>
			<span class="text-sm">{meetingDetails.lunch ? 'Yes' : 'No'}</span>
			<span class="text-sm font-semibold">VC</span>
			<span class="text-sm">{meetingDetails.vc ? 'Yes' : 'No'}</span>
			<span class="text-sm font-semibold">Jobcode</span>
			<span class="text-sm">{meetingDetails.jobcode}</span>
			<span class="text-sm font-semibold self-center">Status</span>
			<span
				class="text-sm w-fit px-3 py-1 rounded-lg text-white {meetingDetails.status ===
				MeetingStatus.APPROVED
					? 'bg-green-500'
					: meetingDetails.status === MeetingStatus.PENDING
					? 'bg-yellow-500'
					: 'bg-red-500'}"
				>{meetingDetails.status === MeetingStatus.APPROVED
					? 'Approved'
					: meetingDetails.status === MeetingStatus.PENDING
					? 'Pending'
					: 'Rejected'}</span
			>
			<div class="col-span-2 flex justify-around mt-4">
				{#if $userStore?.role === 'Admin'}
					{#if meetingDetails.status === MeetingStatus.PENDING}
						<button
							class="btn btn-sm btn-success"
							on:click={() => {
								if (!meetingDetails) return;
								toast.promise(
									updateMeetingStatus(meetingDetails.id, MeetingStatus.APPROVED).then(() => {
										meetingsStore.set(
											$meetingsStore.map((meet) => {
												if (meet.id === meetingDetails?.id) {
													meet.status = MeetingStatus.APPROVED;
												}
												return meet;
											})
										);
										closeModal();
									}),
									{
										loading: 'Approving meeting...',
										success: 'Meeting approved successfully!',
										error: 'Failed to approve meeting'
									}
								);
							}}>Approve</button
						>
						<button
							class="btn btn-sm btn-error"
							on:click={() => {
								if (!meetingDetails) return;
								toast.promise(
									updateMeetingStatus(meetingDetails.id, MeetingStatus.REJECTED).then(() => {
										meetingsStore.set(
											$meetingsStore.map((meet) => {
												if (meet.id === meetingDetails?.id) {
													meet.status = MeetingStatus.REJECTED;
												}
												return meet;
											})
										);
										closeModal();
									}),
									{
										loading: 'Rejecting meeting...',
										success: 'Meeting rejected successfully!',
										error: 'Failed to reject meeting'
									}
								);
							}}>Reject</button
						>
					{/if}
				{/if}
			</div>
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
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			font-size: 1.1rem;
			font-weight: 600;
			line-height: 1.25rem;
		}
	}
</style>
