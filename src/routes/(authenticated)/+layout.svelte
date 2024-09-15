<script>
	import '../../app.css';
</script>

<main class="container mx-auto grid grid-cols-[auto_1fr]">
	<aside class="w-52 border-r h-screen">
		<ul>
			<li><a href="/products">Products</a></li>
			<li><a href="/customers">Customers</a></li>
			<li><a href="/orders">Orders</a></li>
			<li><a href="/inventory">Inventory</a></li>
			<li><a href="/invoices">Invoices</a></li>
			<li><a href="/payments">Payments</a></li>
		</ul>
	</aside>
	<section class=" p-4">
		<slot />
	</section>
</main>
