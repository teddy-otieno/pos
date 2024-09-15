<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main>
	<h1 class="mb-4 font-medium underline">Invoices</h1>
	<table>
		<thead>
			<tr>
				<th>Customer</th>
				<th>product</th>
				<th>Unit Price</th>
				<th>Quantity</th>
				<th>Total</th>
				<th>Balance</th>
				<th>Status</th>
				<th>Pay</th>
			</tr>
		</thead>
		<tbody>
			{#each data.invoices as invoice}
				<tr>
					<td>{`${invoice.customer.first_name} ${invoice.customer.last_name}`}</td>
					<td>{invoice.product.name}</td>
					<td>Ksh {invoice.product.unit_price.toLocaleString()}</td>
					<td>{invoice.quantity}</td>
					<td>Ksh {invoice.total.toLocaleString()}</td>
					<td>Ksh {invoice.balance.toLocaleString()}</td>
					<td>{invoice.is_paid ? 'Paid' : invoice.invoiced ? 'Invoiced' : 'Cancelled'}</td
					>
					<td><a href={`/payments/${invoice.id}/new`}>Pay</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
