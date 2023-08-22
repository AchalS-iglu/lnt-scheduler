import { supabase } from '$lib/supabase/client';

/**
 *
 * @typedef {Object} Meeting_t
 * @param {string} meeting.id
 * @param {string} meeting.name
 * @param {string} meeting.description
 * @param {number} meeting.start
 * @param {number} meeting.end
 * @param {number} meeting.roomId
 * @param {number} meeting.userId
 * @param {number} meeting.createdAt
 * @param {number} meeting.participants
 * @param {boolean} meeting.refreshments
 * @param {boolean} meeting.lunch
 * @param {boolean} meeting.vc
 * @param {string} meeting.jobcode
 * @param {MeetingStatus} meeting.status
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

/**
 *
 * @param {Meeting_t} meeting
 * @returns
 */
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
 *
 * @param {string} id
 * @param {MeetingStatus} status
 * @returns {Promise<Meeting_t[]>}
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
