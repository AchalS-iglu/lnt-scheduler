<script lang="ts">
	import '@fullcalendar/core/vdom.cjs';

	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import listPlugin from '@fullcalendar/list';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import { goto } from '$app/navigation';
	import { modalStore } from '$lib/stores';
	import NewEvent from '../components/modals/NewEvent.svelte';
	import EventDetails from '../components/modals/EventDetails.svelte';

	let options: CalendarOptions = {
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
		}
	};

	modalStore.set({
		component: EventDetails,
		props: {
			isStandalone: false
		},
		isLoading: false
	});
</script>

<div class="grid px-8 py-8 gap-4" style="grid-template-columns: 3fr 1fr;">
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
