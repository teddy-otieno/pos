import { db } from '$lib/surreal';
import { jsonify, RecordId, StringRecordId } from 'surrealdb.js';
import type { PageServerLoad } from '../$types';
import type { Actions } from './$types';

import { InventoryMovementValidator, type InventoryMovementSchema, type Product } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const [products] = await db.query<[Product[]]>('SELECT * from products;');

	return {
		products: jsonify(products)
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = Object.fromEntries(await request.formData());

		let new_movement = InventoryMovementValidator.parse(form);
		new_movement = {
			...new_movement,
			product: new StringRecordId(new_movement.product)
		} as any;

		const movement = await db.create('inventory_movement', new_movement);

		console.log(new_movement);
		console.log(movement);

		redirect(302, '/inventory');
	}
} satisfies Actions;
