import { db } from '$lib/surreal';
import { jsonify, StringRecordId } from 'surrealdb.js';
import type { Actions, PageServerLoad } from './$types';
import type { OrderToBeInvoiced } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const [order] = await db.query<[OrderToBeInvoiced]>(
		'SELECT *, ->products[0][*] as product, <-customers[0][*] AS customer, math::sum((SELECT VALUE quantity FROM inventory_movement)) AS balance FROM ONLY $id',
		{
			id: new StringRecordId(params.id)
		}
	);

	return {
		order: jsonify(order)
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		console.log(form);
		console.log('invoice' in form);

		if (form.has('cancel')) {
			const invoice = await db.create('invoice', {
				order_id: new StringRecordId(params.id),
				invoiced: false,
				inserted_at: new Date()
			});

			console.log(invoice);
			redirect(302, '/invoices');
		}

		if (form.has('invoice')) {
			const invoice = await db.create('invoice', {
				order_id: new StringRecordId(params.id),
				invoiced: true,
				inserted_at: new Date()
			});

			console.log(invoice);
			redirect(302, '/invoices');
		}

		//DO Nothing if invalid input has been passed
	}
} satisfies Actions;
