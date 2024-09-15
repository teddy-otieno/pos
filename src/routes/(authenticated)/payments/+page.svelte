<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="p-4">
	<h1 class="font-medium underline">Payments</h1>
	<br />
	<table>
		<thead>
			<tr>
				<th>Customer</th>
				<th>Payment Mode</th>
				<th>Amount</th>
				<th>Invoice</th>
			</tr>
		</thead>
		<tbody>
			{#each data.payments as payment}
				<tr>
					<td>{payment.customer.first_name + ' ' + payment.customer.last_name}</td>
					<td>{payment.payment_mode}</td>
					<td>Ksh {payment.amount.toLocaleString()}</td>
					<td>
						<a href={`invoices/${payment.invoice}`}>{payment.invoice}</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
