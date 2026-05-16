<script lang="ts">
	import { Label, Input, Card, GradientButton } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';

	let { form } = $props();
</script>

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-16 lg:py-0">
	<Card class="w-full sm:max-w-md">
		<h1 class="text-2xl font-bold text-center pt-3 leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white mb-6">
			Přihlášení do GymRank
		</h1>

		<form class="space-y-4 md:space-y-6 p-3" method="POST" use:enhance>
			<div>
				<Label for="email" class="mb-2 ml-2">Email</Label>
				<Input type="email" name="email" id="email" placeholder="jmeno@email.cz" required />
			</div>

			<div>
				<Label for="password" class="mb-2 ml-2">Heslo</Label>
				<Input type="password" name="password" id="password" placeholder="••••••••" required />
			</div>

			<div>
				<a href={resolve('/auth/reset-password')} class="text-xs font-bold text-primary-500 hover:underline italic">
            	    Zapomněl jsi heslo?
            	</a>
			</div>

			{#if form?.message}
				<p class="text-sm font-medium text-red-500 dark:text-red-400">
					{form.message}
				</p>
			{/if}

			<GradientButton pill outline color="pinkToOrange" type="submit" class="w-full bg-primary-600 hover:bg-primary-700">Přihlásit se</GradientButton>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
				Ještě nemáš účet? 
                <a href={resolve('/register')} class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Zaregistruj se
                </a>
			</p>
		</form>
	</Card>
</div>