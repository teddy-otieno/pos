<script lang="ts">
	import { type PageServerData } from './$types';

	export let data: PageServerData;
</script>

<table>
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Phone Number</th>
			<th>Email</th>
		</tr>
	</thead>
	<tbody>
		{#each data.customers as customer}
			<tr>
				<td>{customer.first_name}</td>
				<td>{customer.last_name}</td>
				<td>{customer.phone_number}</td>
				<td>{customer.email}</td>
			</tr>
		{/each}
	</tbody>
</table>

<a href="/customers/new">Add Customer</a>
