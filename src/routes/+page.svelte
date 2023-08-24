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

	/**
	 * @type {number}
	 */
	let windowWidth;
	$: windowWidth < 768 ? (options.aspectRatio = 1) : (options.aspectRatio = 1.8);

	onMount(async () => {
		meetingsStore.set(await getMeetings());
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
				meetingsStore.set(payload);
			}
		)
		.subscribe();

	let meetings = $meetingsStore;

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
		events: meetings.map((meeting) => {
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
					meeting: meetings.find((m) => m.id === e.event.id)
				},
				isLoading: false
			});
		}
	};
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="grid px-8 py-8 gap-6 h-screen" style="grid-template-columns: 3fr 1fr;">
	<div class="flex flex-col gap-4">
		<div class="font-medium text-xl pb-2">Hello !</div>
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
		<div class="flex flex-col bg-slate-200 rounded-lg h-full py-6 px-4">
			<div class="font-medium text-center">Upcoming Events</div>
		</div>
	</div>
</div>

<UserProfile />
