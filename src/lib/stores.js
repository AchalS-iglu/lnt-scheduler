import { writable } from 'svelte/store';
import { cachedwritable } from 'svelte-cached-store';

/**
 * @type {import("svelte/store").Writable<{component: any, props: any, isLoading: boolean} | null>}
 */
export const modalStore = writable(null);

/**
 * @type {import ("svelte/store").Writable<{[key: any]: any} | null>}
 */
export const userStore = cachedwritable(null, 'auth');

/**
 * @type {import ("svelte/store").Writable<import('./models/meeting').Meeting[]>}
*/
export const meetingsStore = cachedwritable([], 'meetings');
