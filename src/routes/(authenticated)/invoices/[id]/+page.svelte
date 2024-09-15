<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="form-container">
	<form method="post" enctype="multipart/form-data" class="content-form">
		<h1>Invoice</h1>

		<div class="item-row">
			<span class="item-label">Product</span>
			<span class="item-data">{data.order.product.name}</span>
		</div>
		<div class="item-row">
			<span class="item-label">Customer</span>
			<span class="item-data">
				{data.order.customer.first_name + ' ' + data.order.customer.last_name}
			</span>
		</div>

		<div class="item-row">
			<span class="item-label">Order Quantity</span>
			<span class="item-data">{data.order.quantity}</span>
		</div>
		<div class="item-row">
			<span class="item-label">Inventory Balance</span>
			<span class="item-data">{data.order.balance}</span>
		</div>

		<div>
			<input type="submit" class="primary-button" name="invoice" value="Invoice" />
			<input type="submit" class="cancel-button" name="cancel" value="Cancel" />
		</div>
	</form>
</main>

<style>
	.item-row {
		@apply grid grid-cols-2;
	}
	.item-label {
		@apply font-medium;
	}
</style>
