import { supabase } from '$lib/supabase/client';

/**
 *
 * @param {Object} user
 * @param {string} user.id
 * @param {string} user.name
 * @param {string} user.email
 * @param {string} user.password
 * @param {string} user.role
 */
export async function createUser(user) {
	const { data, error } = await supabase.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				name: user.name,
				role: user.role
			}
		}
	});
	if (error) {
		throw error;
	}
	if (data) {
		return data;
	}
}

/**
 *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.password
 * @returns
 */
export async function signInUser(user) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: user.password
	});
	if (error) {
		throw error;
	}
	if (data) {
		return data;
	}
}

export async function signOutUser() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw error;
	}
}

/**
 *
 * @param {string} email
 */
export async function sendResetPasswordMail(email) {
	const { data, error } = await supabase.auth.resetPasswordForEmail(email);
	if (error) throw error;
	return data;
}

/**
 * 
 * @param {string} id 
 */
export const getUserbyId = async (id) => {
	const { data, error } = await supabase.auth.admin.getUserById(id);
	if (error) throw error;
	if (data) return data;
};
