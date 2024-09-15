import { db } from '$lib/surreal';
import type { Invoice } from '$lib/types';
import { jsonify, surql } from 'surrealdb.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [invoices] = await db.query<[Invoice[]]>(surql`
		SELECT *, 
			(order_id->products)[0][*] AS product, 
			(order_id<-customers)[0][*] AS customer, 
			(order_id->products.unit_price)[0] * order_id.quantity AS total,
			order_id.quantity as quantity,
			(- math::sum((SELECT VALUE total_paid from total_invoice_payments where $parent.id = invoice.id)) + (order_id->products.unit_price)[0] * order_id.quantity) <= 0 AS is_paid,
			(- math::sum((SELECT VALUE total_paid from total_invoice_payments where $parent.id = invoice.id)) + (order_id->products.unit_price)[0] * order_id.quantity)  as balance
		FROM invoice
			ORDER BY inserted_at DESC;
	`);

	return {
		invoices: jsonify(invoices)
	};
};
