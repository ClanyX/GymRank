<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="max-w-md mx-auto my-12 p-6 dark:bg-gray-800 bg-gray-100 rounded-2xl border dark:border-gray-700 border-gray-300 shadow-xl">
	<h1 class="text-2xl font-black uppercase italic text-gray-400 mb-6 tracking-wider">Zapomenuté heslo</h1>

	{#if form?.success}
		<div class="p-4 mb-4 text-sm text-green-500 bg-green-950/30 border border-green-900 rounded-lg">
			Odkaz na obnovu hesla byl odeslán na tvůj e-mail. Zkontroluj si schránku (i SPAM).
		</div>
	{:else}
		<form method="POST" use:enhance class="space-y-4">
			<div>
				<Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic">Tvůj e-mail</Label>
				<Input type="email" name="email" placeholder="jmeno@email.cz" required class="dark:bg-gray-800 bg-white" />
			</div>

			{#if form?.error}
				<p class="text-sm text-red-500 font-medium italic">{form.error}</p>
			{/if}

			<Button type="submit" color="green" pill class="w-full uppercase font-black tracking-wider">
				Odeslat odkaz na reset
			</Button>
		</form>
	{/if}
</div>