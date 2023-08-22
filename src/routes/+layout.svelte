<script>
  import "../app.css";
	import { Toaster } from 'svelte-french-toast';
	import Modal from "../components/modals/Modal.svelte";
</script>

<Toaster />
<Modal />
<slot />