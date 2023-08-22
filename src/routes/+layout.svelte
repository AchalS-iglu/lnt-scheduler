<script>
	import { modalStore, userStore } from "$lib/stores";
	import { supabase } from "$lib/supabase/client";
  import "../app.css";
	import { Toaster } from 'svelte-french-toast';
	import Modal from "../components/modals/Modal.svelte";

  supabase.auth.onAuthStateChange((e, s) => {
    if (e === "PASSWORD_RECOVERY") {
      console.log(e)
    }
    if (s) {
      userStore.set(s)
    }
  })
</script>

<Toaster />
<Modal />
<slot />

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
</style>
