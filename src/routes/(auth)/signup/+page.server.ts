import { db } from '$lib/surreal';
import type { Actions } from './$types';
import { z } from 'zod';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';

const LoginCreds = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.string(),
	pass: z.string()
});

export const actions = {
	default: async ({ request, cookies }) => {
		const data = Object.fromEntries(await request.formData());
		const signup_creds = LoginCreds.parse(data);

		const [user] = await db.create('user', {
			...signup_creds,
			pass: await argon.hash(signup_creds.pass)
		});

		const token = jwt.sign({ user: user.id }, 'ecommerce');

		cookies.set('token', token, { path: '/' });
		redirect(302, '/');
	}
} satisfies Actions;
