import { modalStore } from "./stores";

export const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

export function closeModal() {
    modalStore.set(null);
}

/**
 * 
 * @param {Date} datetime 
 * @returns 
 */
export function visualDate(datetime) {
    return datetime.toDateString();
}