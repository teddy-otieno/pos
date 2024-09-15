import type { Actions } from './$types';
import { db } from '$lib/surreal';
import { redirect } from '@sveltejs/kit';
import { ProductSchemaValidator, type Product, type ProductSchema } from '$lib/types';

export const actions = {
	default: async ({ request }) => {
		const form = Object.fromEntries(await request.formData());

		const product = ProductSchemaValidator.parse(form);

		const result = await db.create<ProductSchema>('products', product);

		if (result.length === 0) {
			console.log('Failed to create');
			return;
		}
		console.log('Created');
		redirect(302, '/products');
	}
} satisfies Actions;
