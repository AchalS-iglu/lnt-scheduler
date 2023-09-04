<script>
	import { getUserbyId, signOutUser } from '$lib/models/user';
	import { modalStore, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import ChnagePwd from './modals/ChnagePwd.svelte';
	import { goto } from '$app/navigation';
	import AdminPanel from './modals/AdminPanel.svelte';
</script>

<div class="absolute bottom-0 right-0 mb-2 mr-2">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-200 w-fit">
		<input type="checkbox" />
		<div class="collapse-title font-medium min-h-0">{$userStore?.name ?? 'Unknown'}</div>
		<div class="collapse-content p-0">
			<ul class="menu bg-base-200 w-56 rounded-box">
				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<li>
					<a
						on:click={() => {
							modalStore.set({
								component: ChnagePwd,
								props: {
									isStandalone: false
								},
								isLoading: false
							});
						}}>Change Password</a
					>
				</li>
			</ul>
			<ul class="menu bg-base-200 w-56 rounded-box">
				<!-- svelte-ignore a11y-missing-attribute -->
				<li><button on:click={
					() => {
						modalStore.set({
							component: AdminPanel,
							props: {
								isStandalone: false
							},
							isLoading: false
						});
					}
				}>Admin Panel</button></li>
			</ul>
			<ul class="menu bg-base-200 w-56 rounded-box">
				<!-- svelte-ignore a11y-missing-attribute -->
				<li><button on:click={signOutUser}>Logout</button></li>
			</ul>
		</div>
	</div>
</div>
