<script>
	import '@fullcalendar/core/vdom.cjs';

	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import listPlugin from '@fullcalendar/list';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import FullCalendar from 'svelte-fullcalendar';
	import { modalStore } from '$lib/stores';
	import NewEvent from '../components/modals/NewEvent.svelte';
	import EventDetails from '../components/modals/EventDetails.svelte';
	import { MeetingStatus } from '$lib/models/meeting';
	import UserProfile from '../components/UserProfile.svelte';

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
		events: [
			{
				id: '1',
				title: 'Test Meeting',
				start: Date.now(),
				end: Date.now() + 1000 * 60 * 60
			}
		],
		eventClick: (e) => {
			console.log(e.event.id);
		}
	};

	/**
	 * @type {number}
	 */
	let windowWidth;
	$: windowWidth < 768 ? (options.aspectRatio = 1) : (options.aspectRatio = 1.8);

	// modalStore.set({
	// 	component: EventDetails,
	// 	props: {
	// 		isStandalone: false,
	// 		meeting: {
	// 			id: '1',
	// 			name: 'Test Meeting',
	// 			description:
	// 				'This is a test meeting, and this is a long ass description which it will not be anble to handle welp and it is aable to handle it now lets check this out, welp this is nice and great work @SK hehehehe',
	// 			start: Date.now(),
	// 			end: Date.now() + 1000 * 60 * 60,
	// 			roomId: 1,
	// 			userId: 1,
	// 			createdAt: Date.now(),
	// 			participants: 10,
	// 			refreshments: true,
	// 			lunch: true,
	// 			vc: true,
	// 			jobcode: '123456',
	// 			status: MeetingStatus.APPROVED
	// 		}
	// 	},
	// 	isLoading: false
	// });
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