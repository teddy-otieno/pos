<script lang="ts">
	import type { PageServerData } from '../$types';

	export let data: PageServerData;
</script>

<main class="form-container">
	<form class="content-form" method="POST" enctype="multipart/form-data">
		<label for="products">Product</label>

		<select id="products" name="product" required>
			{#each data.products as product}
				<option value={product.id}>{product.name}</option>
			{/each}
		</select>

		<label for="quantity">Quantity</label>
		<input type="number" name="quantity" id="quantity" required />

		<input type="submit" name="submit" value="Move Inventory" />
	</form>
</main>
