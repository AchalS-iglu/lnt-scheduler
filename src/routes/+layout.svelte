<script>
	import { modalStore, userStore } from '$lib/stores';
	import { supabase } from '$lib/supabase/client';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Modal from '../components/modals/Modal.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getUserbyId } from '$lib/models/user';
	import ChnagePwd from '../components/modals/ChnagePwd.svelte';

	supabase.auth.onAuthStateChange((e, s) => {
		if (e === 'PASSWORD_RECOVERY') {
			modalStore.set({
				component: ChnagePwd,
				props: {},
				isLoading: false
			});
		}
		userStore.set(s);
		if (s)
			getUserbyId(s?.user.id ?? '').then((res) => {
				userStore.set({
					...s,
					name: res[0]?.name ? res[0].name : 'Unknown',
					role: res[0]?.role ? res[0].role : 'Unknown'
				});
			});
		else if (e === 'SIGNED_OUT') {
			userStore.set(null);
			goto('/login');
		}
	});

	$: if (!$userStore) {
		onMount(() => {
			goto('/login');
		});
	}
</script>

<Toaster />
<Modal />
<slot />

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
</style>
