<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="p-4">
	<h1 class="mb-4 underline font-medium">Orders</h1>

	<table>
		<thead>
			<tr>
				<th>Customer Name</th>
				<th>Product</th>
				<th>Unit Price</th>
				<th>Quantity</th>
				<th>Total</th>
				<th>Status</th>
				<th>Invoice</th>
			</tr>
		</thead>
		<tbody>
			{#each data.orders as order}
				<tr>
					<td>{`${order.customer.first_name} ${order.customer.last_name}`}</td>
					<td>{order.product.name}</td>
					<td>Ksh{order.product.unit_price.toLocaleString()}</td>
					<td>{order.quantity} {order.product.unit}</td>
					<td>Ksh{order.total.toLocaleString()}</td>
					<td class={order.invoiced ? 'text-green-600' : 'text-gray-500'}
						>{order.invoiced ? 'Invoiced' : 'Pending'}</td
					>
					<td><a href={`/invoices/${order.id}`}>Invoice</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="p-4 flex justify-end">
		<a class="primary-button" href="/orders/new">Add Order</a>
	</div>
</main>
