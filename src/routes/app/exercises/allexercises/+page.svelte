<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Label } from 'flowbite-svelte';

    let { data } = $props();

    let searchTerm = $state('');
    let selectedExercise = $state('');
    let selectedGender = $state('');
    let minAge = $state(10);
    let maxAge = $state(60);

    //sort
    let sortBy = $state('weight');

    $effect(() => {
        if (minAge > maxAge) {
            const temp = minAge;
            minAge = maxAge;
            maxAge = temp;
        }
    });

    let filteredRecords = $derived(
        data.allRecords
            .filter(item => {
                const fullName = `${item.userInfo?.firstName} ${item.userInfo?.lastName}`.toLowerCase();
                const age = calculateAge(item.userInfo?.age ?? '');

                const matchesSearch = fullName.includes(searchTerm.toLowerCase());
                const matchesExercise = selectedExercise === '' || item.exercisesInfo?.exerciseName === selectedExercise;
                const matchesGender = selectedGender === '' || item.userInfo?.gender === selectedGender;
                const matchesAge = age >= minAge && age <= maxAge;
                return matchesSearch && matchesExercise && matchesGender && matchesAge;
            })
            .sort((a, b) => {
                if(sortBy === 'weight'){
                    return b.recordInfo.liftedWeight - a.recordInfo.liftedWeight;
                } else if(sortBy === 'relative'){
                    const aRelative = a.recordInfo.liftedWeight / ((a.userInfo?.weight ?? 1) / 1000);
                    const bRelative = b.recordInfo.liftedWeight / ((b.userInfo?.weight ?? 1) / 1000);
                    return bRelative - aRelative;
                }
                return 0;
            })
    );

    function calculateAge(birthDate: string | Date) {
        if (!birthDate) return 0;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    const uniqueExercises = $derived([...new Set(data.allRecords.map(r => r.exercisesInfo?.exerciseName).filter((ex): ex is string => !!ex))]);
    const uniqueGenders = $derived([...new Set(data.allRecords.map(r => r.userInfo?.gender).filter((g): g is "male" | "female" | "other" => !!g))]);
</script>

<div class="p-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 dark:bg-gray-900  bg-gray-100 p-6 rounded-2xl border dark:border-gray-800 border-gray-300 shadow-xl">
        <!-- Name filter -->
        <div>
            <Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic">Hledat sportovce</Label>
            <Search size="md" bind:value={searchTerm} placeholder="Jméno nebo příjmení..." />
        </div>
        <!-- Exercise filter -->
        <div>
            <Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic">Filtrovat cvik</Label>
            <select 
                bind:value={selectedExercise}
                class="dark:bg-gray-800 bg-gray-100 dark:border-gray-800 border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
            >
                <option value="">Všechny cviky</option>
                {#each uniqueExercises as ex (ex)}
                    <option value={ex}>{ex}</option>  
                {/each}
            </select>
        </div>
        <!-- Gender filter -->
        <div>
            <Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic">Filtrovat pohlaví</Label>
            <select 
                bind:value={selectedGender}
                class="dark:bg-gray-800 bg-gray-100 dark:border-gray-800 border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
            >
                <option value="">Všechna pohlaví</option>
                {#each uniqueGenders as ex (ex)}
                    <option value={ex}>{ex.charAt(0).toUpperCase() + ex.slice(1)}</option>
                {/each}
            </select>
        </div>
        <!-- Age filter -->
        <div>
            <Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic tracking-wider">Věk v rozsahu</Label>

            <div class="flex items-center gap-4 p-2 dark:bg-gray-800 bg-gray-100 dark:border-gray-800 border-gray-300 rounded-lg border">            
                <div class="relative h-6 flex items-center flex-1">
                    <div class="absolute w-full h-1.5 dark:bg-gray-700 bg-gray-300 rounded-full"></div>
                
                    <div 
                        class="absolute h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full"
                        style="left: {(minAge - 10) / (100 - 30) * 100}%; right: {100 - (maxAge - 10) / (100 - 30) * 100}%"
                    ></div>

                    <input 
                        type="range" min="10" max="80" bind:value={minAge} 
                        class="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-700 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md"
                    />
                
                    <input 
                        type="range" min="10" max="80" bind:value={maxAge} 
                        class="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-700 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md"
                    />
                </div>

                <div class="min-w-22.5 shrink-0">
                    <span class="dark:text-gray-200 text-gray-600 font-black text-xl tracking-tighter leading-none">
                        {minAge} — {maxAge}
                    </span>
                    <span class="text-[10px] text-gray-500 uppercase font-bold ml-0.5">let</span>
                </div>
            </div>
        </div>
        <!-- Sort method -->
        <div>
            <Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic tracking-wider">Řadit podle</Label>
            <select 
                bind:value={sortBy}
                class="dark:bg-gray-800 bg-gray-100 dark:border-gray-800 border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
            >
                <option value="weight">Nejtěžší váha</option>
                <option value="relative">Nejlepší relativní výkon</option>
            </select>
        </div>
    </div>

    <div class="rounded-2xl overflow-hidden border dark:border-gray-800 border-gray-300 shadow-2xl">
        <Table hoverable={true}>
            <TableHead class="dark:bg-gray-800/50 bg-gray-300/50 dark:text-gray-300 text-gray-800 uppercase text-[10px] tracking-widest">
                <TableHeadCell>Sportovec</TableHeadCell>
                <TableHeadCell>Cvik</TableHeadCell>
                <TableHeadCell class="text-right">Váha</TableHeadCell>
                <TableHeadCell class="text-right px-8">Datum</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each filteredRecords as item (item)}
                    <TableBodyRow class="border-b border-gray-800 dark:hover:bg-gray-500/30 hover:bg-gray-300/30 transition-colors">
                        <TableBodyCell>
                            <div class="flex flex-col">
                                <span class="font-bold dark:text-gray-200 text-gray-600">
                                    {item.userInfo?.firstName} {item.userInfo?.lastName}
                                </span>
                                <span class="text-[10px] text-gray-500 uppercase">
                                    {item.userInfo?.gender} • Váha: {(item.userInfo?.weight ?? 0) / 1000} kg • Věk: {calculateAge(item.userInfo?.age ?? '')} let
                                </span>
                            </div>
                        </TableBodyCell>

                        <TableBodyCell>
                            <span class="px-2 py-1 rounded bg-primary-950/50 text-primary-400 text-[10px] font-black uppercase italic border border-primary-900/50">
                                {item.exercisesInfo?.exerciseName}
                            </span>
                        </TableBodyCell>

                        <TableBodyCell class="text-right font-black italic text-2xl tracking-tighter dark:text-white text-gray-600">
                            {item.recordInfo.liftedWeight / 1000} <span class="text-[12px] tracking-normal text-gray-500 ml-0.5">kg</span>
                            {#if sortBy === 'relative'}
                                <div class="text-[10px] text-primary-500 font-normal tracking-tight mt-2">
                                    {(item.recordInfo.liftedWeight / (item.userInfo?.weight || 1)).toFixed(2)}x tělesné váhy
                                </div>
                            {/if}
                        </TableBodyCell>

                        <TableBodyCell class="text-right text-xs text-gray-500 font-medium px-8">
                            {new Date(item.recordInfo.addedAt as string | number | Date).toLocaleDateString('cs-CZ')}
                        </TableBodyCell>
                    </TableBodyRow>
                {:else}
                    <TableBodyRow>
                        <TableBodyCell colspan={4} class="text-center py-20 text-gray-600 italic">
                            Nebyl nalezen žádný záznam...
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
</div>