import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/surreal';
import jwt from 'jsonwebtoken';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');

	console.log(token);
	if (token === undefined) {
		redirect(302, '/login');
	}

	try {
		const user = jwt.verify(token, 'ecommerce');
		return {};
	} catch (e) {
		console.log(e);
		cookies.delete('token', { path: '/' });
		redirect(302, '/login');
	}
};
