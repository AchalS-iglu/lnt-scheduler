<script>
	import { modalStore } from "$lib/stores";
	import ChnagePwd from "./modals/ChnagePwd.svelte";

</script>
<div class="absolute bottom-0 right-0 mb-2 mr-2">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-200 w-fit">
		<input type="checkbox" /> 
		<div class="collapse-title font-medium min-h-0">Username</div>
		<div class="collapse-content p-0">
			<ul class="menu bg-base-200 w-56 rounded-box">
				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<li><a on:click={
					() => {
						modalStore.set({
							component: ChnagePwd,
							props: {
								isStandalone: false
							},
							isLoading: false
						})
					}
				}>Change Password</a></li>
			</ul>
			<ul class="menu bg-base-200 w-56 rounded-box">
				<!-- svelte-ignore a11y-missing-attribute -->
				<li><a>Logout</a></li>
			</ul>
		</div>
	</div>
</div>
