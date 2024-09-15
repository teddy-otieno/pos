import { db } from '$lib/surreal';
import { CustomerSchemaValidator, type Customer } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const form = Object.fromEntries(await request.formData());
		const new_customer = CustomerSchemaValidator.parse(form);

		const created_customer = await db.create('customers', new_customer);

		redirect(302, '/customers');
	}
} satisfies Actions;
