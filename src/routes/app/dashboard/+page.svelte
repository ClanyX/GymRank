<script lang="ts">
  import { Card, Button, Heading, P, Badge } from 'flowbite-svelte';
  import { PlusOutline, ArrowRightAltOutline, AwardOutline, ChartLineUpOutline, ClockSolid } from 'flowbite-svelte-icons';
  import { calculateWilksScore } from '$lib/utils/WilksScore.js';
	import { resolve } from '$app/paths';

  let { data } = $props();

  interface DashboardMenuItem {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: any;
    description: string;
    icon: string;
  }

  const dashboardMenu: DashboardMenuItem[] = [
	{
		name: 'Profil',
		href: '/app/profile',
		description: 'Správa tvého účtu, nastavení tělesné váhy, pohlaví a osobních údajů',
		icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
	},
	{
		name: 'Síň slávy',
		href: '/app/exercises/hall-of-fame',
		description: 'Přehled těch absolutně nejlepších a nejtěžších liftů',
		icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
	},
	{
		name: 'Žebříček',
		href: '/app/exercises/allexercises',
		description: 'Kompletní pořadí všech členů gymu',
		icon: 'M9 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
	},
	{
		name: 'Wilks score',
		href: '/app/exercises/wilksscore',
		description: 'Spravedlivé porovnání tvé síly relativně k tvé tělesné váze a pohlaví',
		icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
	},
	{
		name: 'Credits',
		href: '/credits',
		description: 'Poděkování open-source projektům a technologiím, díky kterým GymRank vznikl',
		icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
	},
	{
		name: 'O projektu',
		href: '/about',
		description: 'Roadmapa, použité technologie a příběh stojící za vývojem této aplikace',
		icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
	}
];

  let exercisesMax = $derived(data.exercisesMax ?? []);
  let totalLifted = $derived(exercisesMax.reduce((total, pr) => total + (pr.maxWeight ?? 0), 0) / 1000);

  let totalWilksLift = $derived.by(() => {
    let total = 0;
    exercisesMax.forEach(item => {
      if(item.exerciseName === 'Squat' || item.exerciseName === 'Bench Press' || item.exerciseName === 'Deadlift') {
        total += ((item.maxWeight ?? 0) / 1000);
      }
    });
    return total;
  });

</script>

<div class="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
  
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <Heading tag="h2" class="text-3xl font-black italic uppercase tracking-tighter">
        Ahoj, {data.userData?.firstName}! 👋
      </Heading>
      <P color="text-gray-500 dark:text-gray-400 italic">Dneska je skvělý den na nový osobák.</P>
    </div>
    <Button href="/app/exercises/add" color="alternative" class="dark:bg-gray-700 dark:text-white hover:dark:bg-gray-600 bg-gray-100 hover:bg-gray-200 font-bold uppercase tracking-widest italic shadow-lg shadow-primary-500/30">
      <PlusOutline class="w-5 h-5 mr-2" /> Nový záznam
    </Button>
  </div>

  <hr class="border-gray-200 dark:border-gray-800" />

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card class="bg-linear-to-br dark:from-gray-950 dark:to-gray-800 from-gray-100 to-gray-200 border-gray-200 shadow-xl relative overflow-hidden p-2">
      <div class="relative z-10">
        <h3 class="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Wilks score</h3>
        <p class="text-3xl font-black dark:text-white text-black italic uppercase">{calculateWilksScore(data.userData?.gender ?? 'male', data.userData?.weight ?? 0, totalWilksLift)}</p>
      </div>
      <AwardOutline class="absolute -right-4 -bottom-4 w-24 h-24 dark:text-white/10 text-black/10 rotate-12" />
    </Card>

    <Card class="dark:bg-gray-800 bg-gray-200 border-gray-200 shadow-xl relative overflow-hidden p-2">
      <h3 class="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Celkem zvednuto</h3>
      <p class="text-3xl font-black text-gray-900 dark:text-white">{totalLifted} <span class="text-sm">kg</span></p>
    </Card>

    <Card class="dark:bg-gray-800 bg-gray-200 border-gray-200 shadow-xl relative overflow-hidden p-2">
      <h3 class="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Poslední maximálka</h3>
      <p class="text-3xl font-black text-gray-900 dark:text-white">{data.latestRecord?.exerciseName ?? "Ležení"} → {(data.latestRecord?.weight ?? 0) / 1000} kg</p>
      <Badge border color="gray">
        <ClockSolid class="me-1.5 h-2.5 w-2.5" />
        {(data.latestRecord?.date) ? (new Date(data.latestRecord?.date).toLocaleDateString('cs-CZ')) : "Pořád čekáš na svůj první záznam..."}
        </Badge>
    </Card>
  </div>

  <hr class="border-gray-200 dark:border-gray-800" />

  <div class="flex items-center gap-2 mb-4">
      <ArrowRightAltOutline class="w-6 h-6 text-primary-600" />
      <h3 class="text-xl font-black italic uppercase tracking-tight dark:text-white">Navigace</h3>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto p-4">
    {#each dashboardMenu as item (item.name)}
    <a 
			href={resolve(item.href)}
			class="group relative block bg-white dark:bg-gray-800 border border-zinc-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
		>
			<div class="absolute inset-0 bg-linear-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			
			<div class="flex items-start gap-4 relative z-10">
				<div class="shrink-0 flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} fill="currentColor"></path>
					</svg>
				</div>

				<div class="flex-1 min-w-0 pr-4">
					<h3 class="text-base font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
						{item.name}
					</h3>
					<p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
						{item.description}
					</p>
				</div>

				<div class="shrink-0 self-center text-zinc-400 dark:text-zinc-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
					</svg>
				</div>
			</div>
		</a>
	  {/each}
  </div>

  <hr class="border-gray-200 dark:border-gray-800" />

  <div class="mt-8">
    <div class="flex items-center gap-2 mb-4">
        <ChartLineUpOutline class="w-6 h-6 text-primary-600" />
        <h3 class="text-xl font-black italic uppercase tracking-tight dark:text-white">Moje Maximálky (PRs)</h3>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     {#each data.exercisesMax as pr (pr)}
        <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <span class="font-bold text-gray-700 dark:text-gray-300">{pr.exerciseName}</span>
            <span class="text-2xl font-black text-primary-600 italic">{(pr.maxWeight ?? 0) / 1000} kg</span>
        </div>
     {:else}
        <p class="text-gray-500 italic">Zatím nemáš žádné rekordy. Makej!</p>
     {/each}
     </div>
  </div>
</div>