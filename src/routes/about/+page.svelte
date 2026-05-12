<script lang="ts">
    import { Card, Timeline, TimelineItem, Button } from 'flowbite-svelte';
    import { RocketOutline, AwardOutline, UsersGroupOutline, CodeOutline } from 'flowbite-svelte-icons';
</script>

<div class="max-w-4xl mx-auto p-6 space-y-16">
    <header class="text-center space-y-4 py-10">
        <h1 class="text-5xl md:text-7xl font-bold italic uppercase tracking-tighter dark:text-white">
            O projektu <span class="text-primary-600">GymRank</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Místo, kde se hrubá síla potkává s daty. Žádné výmluvy, jen tvoje rekordy a cesta na vrchol.
        </p>
    </header>

    <hr class="border-gray-700" />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="dark:bg-gray-800 dark:border-gray-700 text-center space-y-4 p-8">
            <AwardOutline class="w-12 h-12 text-primary-500 mx-auto" />
            <h3 class="text-xl font-bold dark:text-white uppercase italic tracking-tight">Soutěživost</h3>
            <p class="text-gray-500 text-sm">Chci vybudovat zdravou rivalitu mezi sportovci v každém gymu.</p>
        </Card>

        <Card class="dark:bg-gray-800 dark:border-gray-700 text-center space-y-4 p-8">
            <UsersGroupOutline class="w-12 h-12 text-primary-500 mx-auto" />
            <h3 class="text-xl font-bold dark:text-white uppercase italic tracking-tight">Komunita</h3>
            <p class="text-gray-500 text-sm">Tady nejsi sám. Sleduj progres ostatních a motivuj se k lepším výkonům.</p>
        </Card>

        <Card class="dark:bg-gray-800 dark:border-gray-700 text-center space-y-4 p-8">
            <RocketOutline class="w-12 h-12 text-primary-500 mx-auto" />
            <h3 class="text-xl font-bold dark:text-white uppercase italic tracking-tight">Progres</h3>
            <p class="text-gray-500 text-sm">Zaznamenávej, analyzuj a překonávej svá včerejší maxima.</p>
        </Card>
    </div>

    <section class="space-y-8">
        <h2 class="text-3xl font-black italic uppercase dark:text-white tracking-tighter flex items-center gap-3">
            <CodeOutline class="w-8 h-8 text-primary-600" /> Cesta projektu
        </h2>
        
        <div class="dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-800">
            <Timeline>
                <TimelineItem title="Nápad a koncept" date="1. Dubna 2026">
                    <p class="text-gray-500 text-sm mt-2">První myšlenka na vytvoření platformy pro liftery, kteří chtějí mít své rekordy přehledně na jednom místě a porovnávat se s ostatními.</p>
                </TimelineItem>
                <TimelineItem title="Vývoj jádra" date="9. Dubna 2026">
                    <p class="text-gray-500 text-sm mt-2">Implementace databáze, systému rekordů a výpočtu skóre pro spravedlivé hodnocení napříč váhovými kategoriemi.</p>
                </TimelineItem>
                <TimelineItem title="Alpha testování" date="16. Dubna 2026">
                    <p class="text-gray-500 text-sm mt-2">Otevření první verze pro uzavřenou skupinu testerů z lokálních fitness center.</p>
                </TimelineItem>
                <TimelineItem title="Spuštění mobilní aplikace" date="6. Května 2026">
                    <p class="text-gray-500 text-sm mt-2">Přidání možnosti stažení aplikace na iOS a Android. Režim ofline a online.</p>
                </TimelineItem>
                <TimelineItem title="Spuštění mobilní aplikace" date="13. Května 2026">
                    <p class="text-gray-500 text-sm mt-2">Spuštění vlastní domény. "gymrank.cz"</p>
                </TimelineItem>
                <!-- TODO: Add timeline item -->
            </Timeline>
        </div>
    </section>

    <footer class="text-center pt-10 border-t border-gray-800">
        <p class="text-gray-500 mb-6 italic">Máš nápad na vylepšení nebo jsi našel chybu?</p>
        <Button color="dark" outline href="/contact" class="px-10 font-black italic uppercase tracking-widest">
            Napiš nám
        </Button>
    </footer>
</div>