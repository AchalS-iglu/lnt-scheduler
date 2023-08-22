<script lang="ts">
	import '@fullcalendar/core/vdom.cjs';

	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import listPlugin from '@fullcalendar/list';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/client';

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
  supabase.auth.getUser().then((res) => {
    console.log(res)
  })
</script>

<div class="grid" style="grid-template-columns: 3fr 1fr;">
	<FullCalendar {options} />
</div>
