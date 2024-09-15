import { to_json } from '$lib/utils';
import { type DetailedOrder } from '$lib/types';
import type { PageServerLoad } from '../$types';
import { db } from '$lib/surreal';
import { surql } from 'surrealdb.js';

export const load: PageServerLoad = async () => {
	const [orders] = await db.query<[DetailedOrder[]]>(
		surql`SELECT *, 
				<-customers[0][*] AS customer, 
				->products[0][*] AS product, 
				id INSIDE (SELECT VALUE order_id FROM invoice) AS invoiced, 
				quantity * (->products[0].unit_price) AS total 
			FROM orders;`
	);
	console.log(orders);

	return {
		orders: to_json(orders)
	};
};
