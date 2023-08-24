import { writable } from 'svelte/store';
import { cachedwritable } from 'svelte-cached-store';

/**
 * @type {import("svelte/store").Writable<{component: any, props: any, isLoading: boolean} | null>}
 */
export const modalStore = writable(null);

/**
 * @type {import ("svelte/store").Writable<import("@supabase/supabase-js").AuthSession | null>}
 */
export const userStore = cachedwritable(null, 'auth');

export const meetingsStore = cachedwritable([], 'meetings');
