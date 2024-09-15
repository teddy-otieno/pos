import { to_json } from '$lib/utils';
import type { PageServerLoad, Actions } from './$types';
import {
	type Order,
	OrderSchemaValidator,
	type Customer,
	type OrderSchema,
	type Product
} from '$lib/types';
import { defaultErrorMap } from 'zod';
import { RecordId, StringRecordId } from 'surrealdb.js';
import { db } from '$lib/surreal';

export const load: PageServerLoad = async () => {
	const [customers, products] = await db.query<[Customer[], Product[]]>(
		'SELECT * FROM customers; SELECT * FROM products'
	);

	return {
		customers: to_json(customers),
		products: to_json(products)
	};
};

export const actions = {
	default: async function ({ request }) {
		const form = Object.fromEntries(await request.formData());

		const raw_order = OrderSchemaValidator.parse(form);

		const order_with_price = { ...raw_order } as any;
		delete order_with_price.product;
		delete order_with_price.customer;

		const order = await db.relate<Order>(
			new StringRecordId(raw_order.customer),
			'orders',
			new StringRecordId(raw_order.product),
			order_with_price
		);

		console.log(order);
	}
} satisfies Actions;
