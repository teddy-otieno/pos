<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<main class="form-container">
	<form method="post" class="content-form">
		<h1 class="text-center font-medium">Customer Payment</h1>

		<h1>Invoice ID: <strong>{data.invoice.id}</strong></h1>
		<h1>
			Expected Amount: <strong class="primary"
				>Ksh. {data.invoice.total.toLocaleString()}</strong
			>
		</h1>
		<br />

		<label for="amount">Amount (Ksh)</label>
		<input type="text" name="amount" value={data.invoice.total} />

		<label for="payment_mode">Payment Mode</label>
		<select name="payment_mode" id="payment_mode">
			<option value="cash">Cash</option>
			<option value="bank">Bank</option>
			<option value="mpesa">Mpesa</option>
		</select>

		<input type="submit" value="submit" />
	</form>
</main>
