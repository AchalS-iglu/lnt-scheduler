<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Modal from '../components/modals/Modal.svelte';
</script>

<Toaster />
<Modal />
<slot />

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
</style>
