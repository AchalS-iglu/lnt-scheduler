import { supabase } from '$lib/supabase/client';

/**
 * @typedef {Object} Meeting
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} start
 * @property {number} end
 * @property {string} roomId
 * @property {string} userId
 * @property {number} createdAt
 * @property {number} participants
 * @property {boolean} refreshments
 * @property {boolean} lunch
 * @property {boolean} vc
 * @property {string} jobcode
 * @property {MeetingStatus} status
 */

/**
 * Enum for Meeting Status
 * @readonly
 * @enum {number}
 */
export const MeetingStatus = {
	PENDING: 0,
	APPROVED: 1,
	REJECTED: 2
};

export async function createMeeting(meeting) {
	const { data, error } = await supabase.from('meetings').insert(meeting);
	if (error) {
		throw error;
	}
	if (data) {
		return data[0];
	}
}

/**
 * @returns {Promise<Meeting[]>}
 */
export async function getMeetings() {
	const { data, error } = await supabase.from('meetings').select();
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
 * @param {MeetingStatus} status
 * @returns {Promise<Meeting[]>}
 */
export async function updateMeetingStatus(id, status) {
	const { data, error } = await supabase.from('meetings').update({ status }).eq('id', id);
	if (error) {
		throw error;
	}
	if (data) {
		return data[0];
	}
	return [];
}

/**
 *
 * @param {string} roomId
 * @param {number} start
 * @param {number} end
 * @returns
 */
export async function getOtherMeetingsPastToday(roomId, start, end) {
	const { data, error } = await supabase
		.from('meetings')
		.select('*')
		.gte('start', end)
		.lte('end', start);
	if (error) {
		throw error;
	}
	if (data) {
		return data;
	}
	return [];
}
