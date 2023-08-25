import { supabase } from '$lib/supabase/client';

/**
 * @typedef {Object} Room_t
 * @property {string} room.id
 * @property {string} room.name
 */

/**
 *
 * @param {Room_t} room
 * @returns
 */

export async function createRoom(room) {
	const { data, error } = await supabase.from('rooms').insert(room);
	if (error) {
		throw error;
	}
	if (data) {
		return data[0];
	}
}

/**
 *
 * @returns {Promise<Room_t[]>} rooms
 */
export async function getRooms() {
	const { data, error } = await supabase.from('rooms').select();
	if (error) {
		throw error;
	}
	if (data) {
		return data;
	}
	return [];
}

/**
 * 
 * @param {string} id
 */
export async function getRoombyId(id) {
	const { data, error } = await supabase.from('rooms').select().eq('id', id);
	if (error) {
		throw error;
	}
	if (data) {
		return data[0];
	}
	return null;
}
