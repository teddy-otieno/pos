import { db } from '$lib/surreal';
import { type Customer } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const customers = await db.select<Customer>('customers');

	return {
		customers: JSON.parse(JSON.stringify(customers))
	};
};
