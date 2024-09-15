import { db } from '$lib/surreal';
import { type Product } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const [products] = await db.query<[Product[]]>('SELECT * from products');

	return {
		products: JSON.parse(JSON.stringify(products))
	};
};
