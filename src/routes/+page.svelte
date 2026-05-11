<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { AwardSolid, ChampagneGlassesSolid, FireOutline, LabelSolid } from 'flowbite-svelte-icons';

    let { data } = $props();

	let words = $state(['GYMRANKS', 'REKORDY', 'LIMITY', 'HRANICE', 'MOŽNOSTI', 'STRACHY', 'MAXIMÁLKY', 'CÍLE', 'VÝKONY', 'PŘEKÁŽKY']);
	let currentWordIndex = $state(0);
	let currentWord = $derived(words[currentWordIndex]);
	let isVisible = $state(true);

	onMount(() => {
		const interval = setInterval(() => {
			isVisible = false;
			
			setTimeout(() => {
				currentWordIndex = (currentWordIndex + 1) % words.length;
				isVisible = true;
			}, 500); 

		}, 2500);
		return () => clearInterval(interval);
	});

    const groupedRecords = $derived(
        data.top3records.reduce((acc, record) => {
            if(!acc[record.exercisename]) {
                acc[record.exercisename] = [];
            }
            acc[record.exercisename].push(record);
            return acc;
        }, {} as Record<string, typeof data.top3records>)
    );

	const getRankClasses = (index: number) => {
		switch (index) {
			case 0:
				return 'bg-yellow-500/10 dark:bg-yellow-500/5 border-l-4 border-l-yellow-400';
			case 1:
				return 'bg-gray-400/10 dark:bg-gray-400/5 border-l-4 border-l-gray-300';
			case 2:
				return 'bg-orange-600/10 dark:bg-orange-600/5 border-l-4 border-l-orange-500';
			default:
				return 'border-l-4 border-l-transparent';
		}
	};
</script>

<div class="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center px-4 text-center selection:bg-primary-500/20">
	<h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white font-sans leading-tight">
		PŘEKONÁVEJ SVÉ
		
		<span class="relative inline-block min-w-50 md:min-w-75 lg:min-w100 text-left">
			{#if isVisible}
				<span transition:fade={{ duration: 300 }} class="absolute inset-0 text-primary-600 dark:text-primary-500 italic uppercase">
					{currentWord}
				</span>
			{/if}
			<span class="opacity-0 uppercase italic">{words[0]}</span>
		</span>
	</h1>

    <Button outline pill color="dark" onclick={() => window.location.href = '/register'} class="mt-8 text-lg md:text-xl">
        Registrace
    </Button>

	<p class="mt-8 text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 font-serif italic tracking-wide">
		by Filip Šandera
	</p>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
    </div>
</div>

<hr class="border-gray-200 dark:border-gray-800" />

<section class="py-20 px-4">
    <div class="max-w-4xl mx-auto">
        <div class="group relative bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 hover:shadow-primary-500/10 hover:border-primary-500/50">
            <div class="flex flex-col md:flex-row gap-10 items-center">
                <div class="shrink-0 w-20 h-20 dark:bg-gray-700 bg-gray-300 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary-600/20">
                    <svg class="w-12 h-12 dark:text-white text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-sans italic uppercase tracking-tight">
                        VAŠE DATA, VAŠE VÝSLEDKY
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 font-light">
                        GymRank propojuje moderní technologie s klasickým tréninkem. Díky synchronizaci v cloudu máš svá data dostupná odkudkoliv – v mobilu v gymu i doma na PC. Sledujeme tvoje <span class="text-primary-600 dark:text-primary-500 font-bold italic">maximálky</span>, analyzujeme objem práce a motivujeme tě k dalšímu opakování. Každý záznam o tvém dřepu nebo mrtvém tahu tvoří mozaiku tvé dlouhodobé síly. Žádné reklamy, žádný balast. Jen ty a tvoje cesta za silou. Sleduj své rekordy, <span class="text-primary-600 dark:text-primary-500 font-bold italic">překonávej limity</span> a buduj disciplínu, která se počítá na kila.
                    </p>
                    
                    <div class="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">100% SOUKROMÍ</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">REKORDY POD KONTROLOU</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">SÍŇ SLÁVY</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">HISTORIE PR</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">DŮKAZ PROGRESU</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">CLOUD SYNC</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">MAXIMÁLNÍ PŘEHLED</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">KOMUNITNÍ ŽEBŘÍČEK</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<hr class="border-gray-200 dark:border-gray-800" />

<div class="p-4 md:p-8 space-y-16 mb-10">
    <div class="border-b-4 border-primary-600 pb-4">
        <h1 class="text-5xl font-black uppercase dark:text-white">
            Ty nejlepší <span class="underline italic">výkony</span>
        </h1>
        <p class="text-gray-500 font-bold uppercase text-xs mt-2 tracking-widest">
            Top 3 výkony v každé disciplíně
        </p>
    </div>

    {#each Object.entries(groupedRecords) as [exerciseName, records] (exerciseName)}
        <section class="space-y-4">
            <h2 class="text-2xl font-black italic uppercase dark:text-white flex items-center gap-3">
                <span class="text-primary-600 font-black"><LabelSolid class="w-6 h-6" /></span> {exerciseName}
            </h2>

            <div class="rounded-2xl overflow-hidden border border-gray-500 dark:bg-gray-800 bg-gray-200 shadow-2xl">
                <Table>
                    <TableHead class="dark:bg-gray-700 bg-gray-200 text-gray-400 uppercase text-[10px] tracking-widest">
                        <TableHeadCell class="w-20 text-center">Rank</TableHeadCell>
                        <TableHeadCell>Zvedač</TableHeadCell>
                        <TableHeadCell class="text-right">Maximálka</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {#each records as record (record)}
                            <TableBodyRow class={getRankClasses(record.rank)}>
                                <TableBodyCell class="text-center font-black">
                                    <div class="flex justify-center gap-2">
                                        {#if record.rank == 1}
                                            #1 <AwardSolid class="w-6 h-6 text-yellow-400" />
                                        {:else if record.rank == 2}
                                            #2 <ChampagneGlassesSolid class="w-6 h-6 text-gray-300" />
                                        {:else if record.rank == 3}
                                            #3 <FireOutline class="w-6 h-6 text-orange-500" />
                                        {:else}
                                            <span class="text-gray-500 text-sm">#{record.rank}</span>
                                        {/if}
                                    </div>
                                </TableBodyCell>

                                <TableBodyCell class="font-bold dark:text-gray-200 text-gray-800 italic">
                                    {record.username}
                                </TableBodyCell>

                                <TableBodyCell class="text-right font-black text-2xl tracking-tighter">
                                    <span class={record.rank == 1 ? "text-yellow-400" : "dark:text-gray-300 text-gray-500"}>
                                        {record.weight / 1000} <span class="text-[10px] uppercase ml-0.5">kg</span>
                                    </span>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
            </div>
        </section>
    {:else}
        <div class="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl">
            <p class="text-gray-600 italic">Zatím nebyly zapsány žádné výkony.</p>
        </div>
    {/each}
</div>