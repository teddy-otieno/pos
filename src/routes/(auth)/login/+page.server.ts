import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/surreal';

const LoginCreds = z.object({
	email: z.string(),
	pass: z.string()
});

export const load: PageServerLoad = ({ cookies }) => {
	const token = cookies.get('token');
	console.log('LOGIN', token);

	if (token !== undefined) {
		console.log('LOGIN++', token);
		redirect(302, '/');
	}

	return {};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = Object.fromEntries(await request.formData());
		const login_creds = LoginCreds.parse(data);

		try {
			const token = await db.signin({
				scope: 'account',
				namespace: 'ecommerce',
				database: 'ecommerce',
				...login_creds
			});

			cookies.set('token', token, {
				path: '/'
			});
			console.log(token);
		} catch (e) {
			console.error(e);

			return fail(422, {
				description: 'failed',
				error: 'Incorrect username or password'
			});
		}
	}
} satisfies Actions;
