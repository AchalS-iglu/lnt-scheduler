import { supabase } from "$lib/supabase/client"

/**
 * 
 * @param {Object} room
 * @param {string} room.id
 * @param {string} room.name 
 * @returns 
 */
export async function createRoom(room) {
    const { data, error } = await supabase
        .from('rooms')
        .insert(room)
    if (error) {
        throw error
    }
    if (data) {
        return data[0]
    }
}