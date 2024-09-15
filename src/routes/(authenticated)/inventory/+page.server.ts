import { db } from '$lib/surreal';
import type { InventoryBalance, InventoryMovementWithBalance } from '$lib/types';
import { jsonify } from 'surrealdb.js';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const [inventory_movements, inventory_balances] = await db.query<
		[InventoryMovementWithBalance[], InventoryBalance[]]
	>(
		'SELECT id, quantity, product.* FROM inventory_movement; SELECT *, product.* FROM inventory_balances'
	);

	return { movements: jsonify(inventory_movements), balances: jsonify(inventory_balances) };
};
