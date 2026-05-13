<section class="max-w-4xl mx-auto px-4 py-12">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-extrabold text-gray-900 mb-4 dark:text-white">Centrum podpory GymRank</h1>
		<p class="text-lg text-gray-400">Vše, co potřebuješ vědět o tréninku, žebříčcích a aplikaci.</p>
	</div>

	<!-- Kategorie karet -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
		<div class="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white dark:bg-gray-600 cursor-pointer">
			<a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing" target="_blank">
				<div class="text-3xl mb-3">📱</div>
				<h3 class="font-bold text-xl mb-2">Instalace PWA</h3>
				<p class="text-sm text-gray-400">Návod, jak mít GymRank stále po ruce na ploše mobilu.</p>
			</a>
		</div>

		<div class="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white dark:bg-gray-600 cursor-pointer">
			<div class="text-3xl mb-3">⚙️</div>
			<h3 class="font-bold text-xl mb-2">Správa účtu</h3>
			<p class="text-sm text-gray-400">Změna hesla, nastavení profilu a ochrana údajů.</p>
		</div>

		<div class="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white dark:bg-gray-600 cursor-pointer">
			<div class="text-3xl mb-3">🔥</div>
			<h3 class="font-bold text-xl mb-2">Metodika Ranku</h3>
			<p class="text-sm text-gray-400">Zjisti, jak počítáme tvé skóre v porovnání s ostatními.</p>
		</div>
	</div>

	<!-- Sekce Nahlášení bugu -->
	<div class="my-16 p-8 border-2 border-dashed border-red-200 dark:border-red-400 rounded-2xl bg-red-50 dark:bg-red-200">
		<div class="flex flex-col md:flex-row items-center gap-6">
			<div class="text-5xl">🐛</div>
			<div class="flex-1">
				<h2 class="text-2xl font-bold text-red-800 mb-2">Našel jsi chybu? Pomoz mi ji opravit!</h2>
				<p class="text-red-700 opacity-90">
					GymRank neustále vylepšuji, ale občas se nějaký šotek vloudí. Pokud něco nefunguje, jak
					má, dej mi vědět.
				</p>

				<div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<ul class="text-sm text-red-900 space-y-1">
						<li class="flex items-center">✅ Popiš, co se stalo</li>
						<li class="flex items-center">✅ Jaké máš zařízení (iPhone/Android)</li>
					</ul>
					<ul class="text-sm text-red-900 space-y-1">
						<li class="flex items-center">✅ Ideálně přilož screenshot</li>
						<li class="flex items-center">✅ Kde přesně jsi v aplikaci byl</li>
					</ul>
				</div>
			</div>
			<div class="mt-4 md:mt-0">
				<a
					href="mailto:info@gymrank.cz?subject=Nahlášení chyby - GymRank" target="_top"
					class="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors inline-block whitespace-nowrap"
				>
					Nahlásit bug
				</a>
			</div>
		</div>
	</div>

	<!-- FAQ Sekce (Akordeon) -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold mb-6 text-center">Často kladené dotazy</h2>

		<details class="group border rounded-lg bg-gray-50 dark:bg-gray-600 p-4">
			<summary class="font-semibold cursor-pointer list-none flex justify-between items-center">
				<span>Jak si přidám záznam cviku?</span>
				<span class="transition group-open:rotate-180">▼</span>
			</summary>
			<p class="mt-3 text-gray-400">
				V sekci "Dashboard" klikni na tlačítko "+ Nový záznam" a vyber si z naší databáze...
			</p>
		</details>

		<details class="group border rounded-lg bg-gray-50 dark:bg-gray-600 p-4">
			<summary class="font-semibold cursor-pointer list-none flex justify-between items-center">
				<span>Co dělat, když mi nepřišel potvrzovací e-mail?</span>
				<span class="transition group-open:rotate-180">▼</span>
			</summary>
			<p class="mt-3 text-gray-400">
				Zkontroluj složku SPAM nebo hromadné zprávy. Pokud tam není, zkus si nechat poslat nový
				odkaz.
			</p>
		</details>
	</div>

	<!-- Kontaktní CTA -->
	<div class="mt-20 bg-blue-600 rounded-2xl p-8 text-center text-white">
		<h2 class="text-2xl font-bold mb-2">Nenašel jsi odpověď?</h2>
		<p class="mb-6 opacity-90">Napiš mi přímo na e-mail a já se ti ozvu.</p>
		<a
			href="mailto:info@gymrank.cz"
			class="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
		>
			Napsat na podporu
		</a>
	</div>
</section>
