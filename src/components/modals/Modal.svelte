<script lang="ts">
	import { modalStore } from '$lib/stores';
	import { closeModal } from '$lib/utils';
	import { onMount } from 'svelte';
	import FlyIn from '../Transitions/FlyIn.svelte';
	import { fade } from 'svelte/transition';
	import Loader from '../Loader.svelte';

	let ModalComponent: any;

	modalStore.subscribe((value) => {
		ModalComponent = value?.component;
	});

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		});

		document.addEventListener('click', (e) => {
			if (e.target === document.querySelector('.ModalContainer')) {
				closeModal();
			}
		});
	});
</script>

<div>
	{#if $modalStore && $modalStore.component}
		<div class="ModalContainer" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
			<FlyIn>
				{#if $modalStore.props.isStandalone}
					<svelte:component this={ModalComponent} />
				{:else}
					<div class="Modal">
						{#if $modalStore?.isLoading}
							<div class="modal-loading">
								<Loader />
							</div>
						{/if}
						<div class="content {$modalStore.isLoading ? 'isloading' : ''} bg-inherit">
							<svelte:component this={ModalComponent} />
						</div>
					</div>
				{/if}
			</FlyIn>
		</div>
	{/if}
</div>

<style lang="scss">
	.ModalContainer {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: rgba($color: #fff, $alpha: 0.8);

		.Modal {
			min-width: 40vw;
			max-width: 50vw;
			min-height: 40vh;
			max-height: 60vh;

			background-color: #f1f5f9;

			padding: 1rem;
			border-radius: 1rem;

			display: flex;
			flex-direction: column;

			overflow: auto;

			@media screen and (max-width: 768px) {
				min-width: 90vw;
				max-width: 95vw;
			}

			.content {
				width: inherit;
				min-height: inherit;

				display: flex;
				flex-direction: column;
				gap: 1rem;

				&.isloading {
					display: none;
				}
			}

			.modal-loading {
				width: 100%;
				min-height: inherit;

				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>