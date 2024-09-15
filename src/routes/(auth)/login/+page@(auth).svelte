<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<main class="form-container">
	<form method="POST" class="content-form" use:enhance>
		<label for="email">Email</label>
		<input id="email" type="email" name="email" required />
		<label for="password">Password</label>
		<input id="password" type="password" name="pass" required />

		<input type="submit" name="_submit" value="Login" />

		{#if form?.error}
			<p class="error">{form?.error}</p>
		{/if}
	</form>
</main>
