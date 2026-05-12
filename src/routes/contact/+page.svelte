<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { EnvelopeSolid, BugOutline } from 'flowbite-svelte-icons';
</script>

<div class="max-w-5xl mx-auto p-6 space-y-12">
	<header class="text-center space-y-4 py-10">
		<h1 class="text-5xl md:text-6xl font-black italic uppercase tracking-tighter dark:text-white">
			Potřebuješ <span class="text-primary-600">Help?</span>
		</h1>
		<p class="text-gray-400 text-lg font-medium">
			Jsem tu pro tebe, ať už jde o bug v aplikaci nebo dotaz ke tvému ranku.
		</p>
	</header>

	<div class="space-y-6 md:space-y-0 flex flex-col md:flex-row gap-6 justify-center items-stretch">
		<Card class="dark:bg-gray-800 border-gray-800 p-6 text-center flex flex-col items-center">
			<div class="flex flex-col items-center gap-3 mb-4 text-center">
				<div class="p-3 bg-primary-900/30 rounded-xl">
					<EnvelopeSolid class="w-6 h-6 text-primary-500" />
				</div>
				<div>
					<h3 class="text-white font-bold uppercase text-sm tracking-wider">Email Support</h3>
					<p class="text-gray-500 text-xs">Odpovídám do 24h</p>
				</div>
			</div>
			<a href="mailto:info@gymrank.cz" class="text-primary-500 font-bold hover:underline"
				>info@gymrank.cz</a
			>
		</Card>

		<Card class="dark:bg-gray-800 border-gray-800 p-6 text-center flex flex-col items-center">
			<div class="flex flex-col items-center gap-3 mb-4 text-center">
				<div class="p-3 bg-gray-800 rounded-xl">
					<BugOutline class="w-6 h-6 text-red-500" />
				</div>
				<div>
					<h3 class="text-white font-bold uppercase text-sm tracking-wider">Nahlásit chybu</h3>
					<p class="text-gray-500 text-xs">Pomoz mi se zlepšovat</p>
				</div>
			</div>
			<p class="text-gray-400 text-xs italic">
				Našel jsi bug v tabulkách nebo grafech? Pošli mi screenshot!
			</p>
		</Card>
	</div>
</div>
