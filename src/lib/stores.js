import { writable } from "svelte/store";

/**
 * @type {import("svelte/store").Writable<{component: any, props: any, isLoading: boolean} | null>}
 */
export const modalStore = writable(null);