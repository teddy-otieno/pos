<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="form-container">
	<form method="POST" class="content-form">
		<label for="customer_id">Customer</label>
		<select name="customer" id="customer_id">
			{#each data.customers as customer}
				<option value={customer.id}>{`${customer.first_name} ${customer.last_name}`}</option
				>
			{/each}
		</select>

		<label for="product_id">Product</label>
		<select name="product" id="product_id">
			{#each data.products as product}
				<option value={product.id}>{product.name}</option>
			{/each}
		</select>

		<label for="quantity">Quantity</label>
		<input type="number" id="quantity" name="quantity" />
		<input type="submit" name="_submit" value="Create Order" />
	</form>
</main>
