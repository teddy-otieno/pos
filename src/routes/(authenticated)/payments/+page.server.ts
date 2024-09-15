import { db } from '$lib/surreal';
import { jsonify, RecordId, surql } from 'surrealdb.js';
import type { PageServerLoad } from './$types';
import type { Customer } from '$lib/types';

type Payment = {
	customer: Customer;
	id: RecordId;
	amount: number;
	invoice: RecordId;
	payment_mode: string;
};

export const load: PageServerLoad = async function () {
	const [payments] = await db.query<[Payment[]]>(surql`
		SELECT *, invoice.order_id<-customers[0][*] as customer from payment;
	`);

	return {
		payments: jsonify(payments)
	};
};
