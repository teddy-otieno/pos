import type { RecordId, StringRecordId } from 'surrealdb.js';
import { z } from 'zod';

export const ProductSchemaValidator = z.object({
	name: z.string(),
	unit: z.string(),
	category: z.string(),
	description: z.string(),
	unit_price: z.string().transform((x) => parseInt(x))
});

export type ProductSchema = typeof ProductSchemaValidator._type;
export type Product = typeof ProductSchemaValidator._type & { id: StringRecordId };

export const CustomerSchemaValidator = z.object({
	first_name: z.string(),
	last_name: z.string(),
	phone_number: z.string(),
	email: z.string()
});

export type CustomerSchema = typeof CustomerSchemaValidator._type;
export type Customer = CustomerSchema & { id: RecordId };

export const OrderSchemaValidator = z.object({
	customer: z.string(),
	product: z.string(),
	quantity: z.string().transform((x) => parseInt(x))
});

export type OrderSchema = typeof OrderSchemaValidator._type;
export type Order = OrderSchema & { id: RecordId };

export type DetailedOrder = {
	product: Product;
	customer: Customer;
	quantity: number;
	id: RecordId;
	invoiced: boolean;
	total: number;
};

export const InventoryMovementValidator = z.object({
	product: z.string(),
	quantity: z.string().transform((x) => parseInt(x))
});

export type InventoryMovementSchema = typeof InventoryMovementValidator._type;
export type InventoryMovement = {
	id: RecordId;
	quantity: number;
	product: string | RecordId | Product;
};

export type InventoryMovementWithBalance = InventoryMovement & { balance: number };

export type InventoryBalance = {
	id: RecordId;
	balance: number;
	product: Product;
};

export type OrderToBeInvoiced = {
	balance: number;
	id: RecordId;
	product: Product;
	quantity: number;
	customer: Customer;
};

export type Invoice = {
	id: RecordId;
	customer: Customer;
	product: Product;
	order_id: RecordId;
	total: number;
	quantity: number;
	invoiced: boolean;
	is_paid: boolean;
	balance: number;
};

export type RawInvoice = {
	id: RecordId;
	invoiced: boolean;
	total: number;
};
