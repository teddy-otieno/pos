<main class="flex items-center justify-center h-screen">
	<form method="POST" class="flex flex-col p-4 shadow border">
		<label for="name">Product Name</label>
		<input type="text" id="name" name="name" required />
		<label for="unit">Unit</label>
		<input type="text" id="unit" name="unit" required />

		<label for="category">Category</label>
		<input type="text" id="category" name="category" required />

		<label for="unit_price">Unit Price</label>
		<input type="number" id="unit_price" name="unit_price" required />

		<label for="description">Description</label>
		<textarea id="description" name="description"></textarea>

		<input type="submit" name="_submit" />
	</form>
</main>
