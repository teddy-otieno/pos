<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main>
	<h1 class="my-4">Product Balances</h1>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Balance</th>
			</tr>
		</thead>
		<tbody>
			{#each data.balances as product}
				<tr>
					<td>{product.product.name}</td>
					<td>{product.balance}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h1 class="my-4">Recent Movement</h1>

	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Quantity</th>
			</tr>
		</thead>
		<tbody>
			{#each data.movements as movement}
				<tr>
					<td>{movement.product.name}</td>
					<td>{movement.quantity}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="flex justify-end">
		<a href="/inventory/new" class="primary-button">Move Inventory</a>
	</div>
</main>
