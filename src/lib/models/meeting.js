import { supabase } from "$lib/supabase/client"

/**
 * @typedef {Object} Meeting
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} start
 * @property {number} end
 * @property {number} roomId
 * @property {number} userId
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
    REJECTED: 2,
}
/**
 * @param {Meeting} meeting
 */
export async function createMeeting(meeting) {
    const { data, error } = await supabase
        .from('meetings')
        .insert(meeting)
    if (error) {
        throw error
    }
    if (data) {
        return data[0]
    }
}

/**
 * 
 * @param {string} id 
 * @param {MeetingStatus} status 
 * @returns 
 */
export async function updateMeetingStatus(id, status) {
    const { data, error } = await supabase
        .from('meetings')
        .update({ status })
        .eq('id', id)
    if (error) {
        throw error
    }
    if (data) {
        return data[0]
    }
}