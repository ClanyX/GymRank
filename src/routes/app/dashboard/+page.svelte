<script lang="ts">
  import { Card, Button, Heading, P, Badge } from 'flowbite-svelte';
  import { PlusOutline, ChartLineUpOutline, AwardOutline, ClockSolid } from 'flowbite-svelte-icons';
  import { calculateWilksScore } from '$lib/utils/WilksScore.js';

  let { data } = $props();

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
    <!-- TODO: add rank -->
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