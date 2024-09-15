<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<table>
	<thead>
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Unit</th>
			<th>Unit Price</th>
			<th>Category</th>
			<th>Description</th>
		</tr>
	</thead>

	<tbody>
		{#each data.products as product}
			<tr>
				<td>{product.id}</td>
				<td>{product.name}</td>
				<td>{product.unit}</td>
				<td>Ksh {product.unit_price}</td>
				<td>{product.category}</td>
				<td>{product.description}</td>
			</tr>
		{/each}
	</tbody>
</table>

<a href="/products/new">Add Product</a>

<style>
</style>
