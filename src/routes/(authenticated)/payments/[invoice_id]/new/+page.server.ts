import { db } from '$lib/surreal';
import { jsonify, StringRecordId, surql } from 'surrealdb.js';
import type { Actions, PageServerLoad } from './$types';
import type { RawInvoice } from '$lib/types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async function ({ params }) {
	const invoice_id = new StringRecordId(params.invoice_id);
	const [invoice] = await db.query<[RawInvoice]>(surql`SELECT 
	*,
	(order_id->products.unit_price)[0] * order_id.quantity AS total
	 FROM ONLY ${invoice_id}`);

	//Create payment information against the invoice

	return {
		invoice: jsonify(invoice)
	};
};

const payment_modes = ['cash', 'bank', 'mpesa'] as const;
const PaymentSchemaValidator = z.object({
	amount: z.string().transform((x) => parseInt(x)),
	payment_mode: z.enum(payment_modes)
});

export const actions = {
	default: async function ({ request, params }) {
		const form = Object.fromEntries(await request.formData());
		const payment = {
			...PaymentSchemaValidator.parse(form),
			invoice: new StringRecordId(params.invoice_id)
		};

		console.log(payment);

		const new_payment = await db.create('payment', payment);

		console.log(new_payment);
		redirect(302, '/payments');
	}
} satisfies Actions;
