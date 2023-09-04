<script>
	import '@fullcalendar/core/vdom.cjs';

	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import listPlugin from '@fullcalendar/list';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import FullCalendar from 'svelte-fullcalendar';
	import { meetingsStore, modalStore } from '$lib/stores';
	import NewEvent from '../components/modals/NewEvent.svelte';
	import EventDetails from '../components/modals/EventDetails.svelte';
	import { MeetingStatus, getMeetings } from '$lib/models/meeting';
	import UserProfile from '../components/UserProfile.svelte';
	import { supabase } from '$lib/supabase/client';
	import { onMount } from 'svelte';
	import { getRooms } from '$lib/models/room';

	/**
	 * @type {number}
	 */
	let windowWidth;
	$: windowWidth < 768 ? (options.aspectRatio = 1) : (options.aspectRatio = 1.8);

	/**
	 * @type {import('$lib/models/room').Room_t[]}
	 */
	let rooms = [];

	onMount(async () => {
		meetingsStore.set(await getMeetings());
		getRooms().then((res) => {
			rooms = res;
		});
	});

	const meetingsChannel = supabase
		.channel('meeting-db-changes')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'meetings'
			},
			(payload) => {
				if (payload.new) {
					meetingsStore.set(
						$meetingsStore.map((meeting) => (meeting.id === payload.new.id ? payload.new : meeting))
					);
				}
			}
		)
		.subscribe();

	/**
	 * @type {import('svelte-fullcalendar').CalendarOptions}
	 */
	let options = {
		initialView: 'dayGridMonth',
		plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		displayEventEnd: true,
		navLinks: true,
		selectable: true,
		aspectRatio: 1.8,
		businessHours: {
			daysOfWeek: [1, 2, 3, 4, 5],
			startTime: '9:00',
			endTime: '21:00'
		},
		events: $meetingsStore.map((meeting) => {
			return {
				id: meeting.id,
				title: meeting.name,
				start: meeting.start,
				end: meeting.end,
				backgroundColor: meeting.status === MeetingStatus.APPROVED ? '#10B981' : '#F59E0B',
				borderColor: meeting.status === MeetingStatus.APPROVED ? '#10B981' : '#F59E0B',
				textColor: '#fff'
			};
		}),
		eventClick: (e) => {
			modalStore.set({
				component: EventDetails,
				props: {
					isStandalone: false,
					meeting: $meetingsStore.find((m) => m.id === e.event.id)
				},
				isLoading: false
			});
		}
	};
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:head>
	<title>Home | Meeting Room Booking System</title>
	<meta name="description" content="Meeting Room Booking System" />
	<meta name="keywords" content="Meeting Room Booking System" />
	<meta name="author" content="Meeting Room Booking System" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" type="image/png" href={'./favicon.png'} />
</svelte:head>

<div class="grid px-8 py-8 gap-6 h-screen" style="grid-template-columns: 3fr 1fr;">
	<div class="flex flex-col gap-4">
		<div class="font-medium text-xl pb-2">Hello There!</div>
		<FullCalendar {options} />
	</div>
	<div class="flex flex-col gap-4">
		<button
			class="btn btn-lg"
			on:click={() =>
				modalStore.set({
					component: NewEvent,
					props: {
						isStandalone: false
					},
					isLoading: false
				})}>New Event</button
		>
		<div class="flex flex-col bg-slate-200 rounded-lg h-full py-6 px-4 gap-4">
			<div class="font-medium text-center">Upcoming Events</div>
			{#each $meetingsStore.filter((meet) => {
				return new Date(meet.start) > new Date();
			}) as meeting}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="flex flex-col gap-2 hover:cursor-pointer"
					on:click={() => {
						modalStore.set({
							component: EventDetails,
							props: {
								isStandalone: false,
								meeting
							},
							isLoading: false
						});
					}}
				>
					<span class="font-medium text-center">{meeting.name}</span>
					<span class="text-xs">{rooms.find((room) => room.id === meeting.roomId)?.name}</span>
					<span class="text-xs">
						{meeting.status === MeetingStatus.APPROVED
							? 'Approved'
							: meeting.status === MeetingStatus.PENDING
							? 'Pending'
							: 'Rejected'}
					</span>
					<div
						class="grid items-center gap-4"
						style="grid-template-columns: max-content 1fr max-content;"
					>
						<span class="text-xs">{new Date(meeting.start).toLocaleString()}</span>
						<div class="border-t border-black" />
						<span class="text-xs">{new Date(meeting.end).toLocaleString()}</span>
					</div>
				</div>
				<div class="border-t border-gray-400" />
			{/each}
		</div>
	</div>
</div>

<UserProfile />
