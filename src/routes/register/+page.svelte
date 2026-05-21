<script lang="ts">
	import { GradientButton, Label, Input, Card, Select, Checkbox, A } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { PUBLIC_TURNSTILE_SITEKEY } from '$env/static/public';
	import { onMount } from 'svelte';

	let { form } = $props();

	let turnstileToken = $state('');
	let container: HTMLElement;

	onMount(() => {
		type TurnstileWidget = {
			render: (
				el: HTMLElement,
				opts: { sitekey: string; theme?: string; callback?: (token: string) => void }
			) => void;
		};

		const win = window as Window & { turnstile?: TurnstileWidget };

		const isDarkMode = document.documentElement.classList.contains('dark');

		const checkTrturnstile = setInterval(() => {
			if (win.turnstile) {
				clearInterval(checkTrturnstile);
				win.turnstile.render(container, {
					sitekey: PUBLIC_TURNSTILE_SITEKEY,
					theme: isDarkMode ? 'dark' : 'light',
					callback: (token: string) => {
						turnstileToken = token;
					},
				});
			}
		}, 100);

		return () => clearInterval(checkTrturnstile);
	});

	let genders = [
		{ value: 'male', name: 'Muž' },
		{ value: 'female', name: 'Žena' },
		{ value: 'other', name: 'Jiné' }
	];

	let agreed = $state(false);
</script>

<svelte:head>
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" async defer></script>
</svelte:head>

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-16 mb-16 lg:py-0">
	<Card class="w-full sm:max-w-md">
		<h1 class="text-2xl font-bold text-center pt-3 leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white mb-6">
			Vytvořit účet
		</h1>

		<form class="space-y-4 md:space-y-6 p-3" method="POST" use:enhance>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<Label for="firstName" class="mb-2">Jméno</Label>
					<Input type="text" name="firstName" id="firstName" placeholder="Jmeno" required />
				</div>
				<div>
					<Label for="lastName" class="mb-2">Příjmení</Label>
					<Input type="text" name="lastName" id="lastName" placeholder="Prijmeni" required />
				</div>
			</div>

			<div>
				<Label for="email" class="mb-2">Email</Label>
				<Input type="email" name="email" id="email" placeholder="jmeno@email.cz" required />
			</div>

			<div>
				<Label for="password" class="mb-2">Heslo</Label>
				<Input type="password" name="password" id="password" placeholder="••••••••" required />
			</div>

			<div>
				<Label for="confirmPassword" class="mb-2">Heslo znovu</Label>
				<Input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" required />
			</div>

			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-3">
					<Label for="weight" class="mb-2 truncate">Váha (kg)</Label>
					<Input type="number" min="0" step="0.1" name="weight" id="weight" placeholder="80" required />
				</div>
				<div class="col-span-5">
					<Label for="gender" class="mb-2">Pohlaví</Label>
					<Select items={genders} name="gender" id="gender" placeholder="Vyber pohlaví..." required />
				</div>
                <div class="col-span-4">
                    <Label for="dateOfBirth" class="mb-2">Datum narození</Label>
                    <Input type="date" name="dateOfBirth" id="dateOfBirth" required />
                </div>
			</div>

			<div class="flex items-center gap-2 py-2 ml-2">
        		<Checkbox id="terms" name="terms" required bind:checked={agreed} class="accent-primary-600" />
				<Label for="terms" class="text-xs text-gray-400 font-medium">
            		Souhlasím se <A href="/terms" target="_blank" class="text-primary-500 hover:underline weight-bold underline">smluvními podmínkami</A> a pravidly Fair-Play
        		</Label>
    		</div>

			<!-- Honeypot -->
			<div class="hidden" aria-hidden="true">
    			<input type="text" name="honeypot" tabindex="-1" autocomplete="off" />
			</div>

			<!-- Turnstile -->
			<input type="hidden" name="captchaToken" value={turnstileToken} />
			<div bind:this={container} class="flex justify-center my-4"></div>

			{#if form?.message}
				<p class="text-sm font-medium text-red-500">{form.message}</p>
			{/if}

            <GradientButton disabled={!turnstileToken || !agreed} pill outline color="pinkToOrange" type="submit" class="w-full bg-primary-600 hover:bg-primary-700">Registrovat se</GradientButton>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
				Už máš účet? 
                <a href={resolve('/login')} class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Přihlásit se
                </a>
			</p>
		</form>
	</Card>
</div>