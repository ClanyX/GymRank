<script lang="ts">    
    let { data } = $props();
    
    let currentUserRow = $derived(
        data.leaderboard.find(row => row.user?.id === data.currentUserId)
    );
    
    let currentUserIndex = $derived(
        data.leaderboard.findIndex(row => row.user?.id === data.currentUserId) + 1
    );
</script>

<div class="space-y-8 max-w-4xl mx-auto p-4">
    
    {#if currentUserRow}
        <div class="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
                <div>
                    <span class="bg-white/20 text-blue-100 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Tvůj aktuální rank
                    </span>
                    <h2 class="text-2xl font-black mt-2 tracking-tight">
                        {currentUserRow.user?.firstName} {currentUserRow.user?.lastName}
                    </h2>
                    <p class="text-blue-200 text-sm mt-1">
                        Tělesná váha: <span class="font-semibold text-white">{(currentUserRow.user?.weight ?? 0) / 1000} kg</span>
                    </p>
                </div>
                
                <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div class="text-center">
                        <span class="text-xs text-blue-200 block uppercase font-bold tracking-wide">Wilks Score</span>
                        <span class="text-4xl font-extrabold tracking-tight">{currentUserRow.wilks.toFixed(2)}</span>
                    </div>
                    <div class="h-10 w-px bg-white/20"></div>
                    <div class="text-center">
                        <span class="text-xs text-blue-200 block uppercase font-bold tracking-wide">Pořadí</span>
                        <span class="text-4xl font-extrabold tracking-tight">#{currentUserIndex}</span>
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
                <h3 class="text-lg font-bold text-zinc-900 dark:text-white">Pound-for-Pound Žebříček</h3>
                <p class="text-sm text-zinc-500 dark:text-zinc-400">Pořadí atletů přepočítané relativně k jejich tělesné váze.</p>
            </div>
            <span class="hidden sm:inline-flex items-center text-xs text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 cursor-help" title="Wilks score srovnává výkony napříč váhovými kategoriemi.">
                Co je Wilks?
            </span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                        <th class="py-3 px-4 w-16 text-center">Pozice</th>
                        <th class="py-3 px-4">Atlet</th>
                        <th class="py-3 px-4 hidden sm:table-cell">Těl. Váha</th>
                        <th class="py-3 px-4 hidden md:table-cell">Total (S/B/D)</th>
                        <th class="py-3 px-4 text-right pr-6">Wilks Score</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                    
                    {#each data.leaderboard as row, index (row)}
                        {@const isMe = row.user?.id === data.currentUserId}
                        {@const rank = index + 1}
                        
                        <tr class="transition-colors 
                            {isMe ? 'bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 border-l-4 border-blue-600' : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30'}"
                        >
                            <td class="py-4 px-4 text-center font-bold">
                                {#if rank === 1}
                                    <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-xs">1</span>
                                {:else if rank === 2}
                                    <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zinc-200 text-zinc-800 text-xs">2</span>
                                {:else if rank === 3}
                                    <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-900 text-xs">3</span>
                                {:else}
                                    <span class="text-zinc-500 dark:text-zinc-400">{rank}</span>
                                {/if}
                            </td>
                            
                            <td class="py-4 px-4 font-semibold text-zinc-900 dark:text-white">
                                <div class="flex items-center gap-2">
                                    {row.user?.firstName} {row.user?.lastName} <span class="text-xs text-zinc-400 font-normal ml-1">{row.user?.gender === 'male' ? 'M' : 'Z'}</span>
                                    {#if isMe}
                                        <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] px-1.5 py-0.5 rounded font-medium">TY</span>
                                    {/if}
                                </div>
                            </td>
                            
                            <td class="py-4 px-4 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell">
                                {((row.user?.weight ?? 0) / 1000).toFixed(1)} kg
                            </td>
                            
                            <td class="py-4 px-4 text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                                <span class="font-bold text-zinc-700 dark:text-zinc-300">{row.total} kg</span> 
                                <span class="text-xs text-zinc-400">({row.squat / 1000}/{row.bench / 1000}/{row.deadlift / 1000})</span>
                            </td>
                            
                            <td class="py-4 px-4 text-right pr-6 font-black text-base 
                                {rank === 1 ? 'text-amber-600 dark:text-amber-400' : isMe ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-100'}"
                            >
                                {row.wilks.toFixed(2)}
                            </td>
                        </tr>
                    {/each}
                    
                    {#if data.leaderboard.length === 0}
                        <tr>
                            <td colspan="5" class="py-8 text-center text-zinc-400">
                                Zatím nikdo nezapsal žádné výkony. Buď první!
                            </td>
                        </tr>
                    {/if}
                    
                </tbody>
            </table>
        </div>
    </div>
</div>