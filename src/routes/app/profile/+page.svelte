<script lang="ts">
    import { Input, Label, Select, Button, Card, Alert } from 'flowbite-svelte';
    import { UserCircleSolid } from 'flowbite-svelte-icons';
    import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
    import { resolve } from '$app/paths';

    let { data, form } = $props();

    const genders = [
        { value: 'male', name: 'Muž' },
        { value: 'female', name: 'Žena' },
        { value: 'other', name: 'Jiné' }
    ];

    function formatDateForInput(date: Date | string | undefined | null) {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }

    let user = $derived({
        firstName: data.userObject?.firstName ?? '',
        lastName: data.userObject?.lastName ?? '',
        weight: data.userObject?.weight ?? 0,
        gender: data.userObject?.gender ?? 'male',
        createdAt: data.userObject?.createdAt ?? new Date(),
        age: formatDateForInput(data.userObject?.dateOfBirth)
    });

    let isSubmitting = $state(false);
</script>

<div class="p-6 max-w-2xl mx-auto">
    <div class="mb-8">
        <h1 class="text-3xl font-black italic uppercase dark:text-white tracking-tighter">
            Můj <span class="text-primary-600">Profil</span>
            <UserCircleSolid class="inline w-7 h-7 text-primary-600 ml-1 mb-2" />
        </h1>
        <p class="text-gray-500 text-sm uppercase tracking-widest font-bold">Nastavení tvého účtu</p>
        <hr class="my-4 border-gray-800" />
        <p class="text-gray-500 text-sm uppercase tracking-widest font-bold">Účet vytvořen: {user.createdAt.getDate()}.{user.createdAt.getMonth() + 1}.{user.createdAt.getFullYear()    }</p>
    </div>

    <Card class="dark:bg-gray-900 dark:border-gray-800 shadow-2xl w-full max-w-none p-2">
        <form method="POST" action="?/updateProfile" use:enhance={() => {
            isSubmitting = true;
            return async ({ update }) => {
                await update( {reset: false} );
                await invalidateAll();
                isSubmitting = false;
            }
        }}  class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <Label class="text-gray-400 font-bold uppercase text-[10px]">Jméno</Label>
                    <Input name="firstName" value={user.firstName} placeholder="Arnold" class="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>

                <div class="space-y-2">
                    <Label class="text-gray-400 font-bold uppercase text-[10px]">Příjmení</Label>
                    <Input name="lastName" value={user.lastName} placeholder="Schwarzenegger" class="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <Label class="text-gray-400 font-bold uppercase text-[10px]">Tvoje váha (kg)</Label>
                    <Input name="weight" step="0.1" min="0" type="number" value={user.weight / 1000} class="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>

                <div class="space-y-2">
                    <Label class="text-gray-400 font-bold uppercase text-[10px]">Pohlaví</Label>
                    <Select items={genders} name="gender" value={user.gender} class="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <Label class="text-gray-400 font-bold uppercase text-[10px]">Datum narození</Label>
                <Input name="dateOfBirth" type="date" value={user.age.toString().split('T')[0]} class="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            </div>

            <div class="grid grid-cols-1 gap-4">
                <Label class="text-gray-400 font-bold uppercase text-[10px]">Změnit heslo</Label>
                <a href={resolve('/auth/update-password')} class="text-primary-600 text-[15px] font-bold hover:underline">
                    Klikni zde pro nastavení nového hesla
                </a>
            </div>

            <div class="pt-4 border-t border-gray-800 flex items-center justify-center space-x-2">
                {#if form?.success}
                    <Alert dismissable color="green" class="p-2.5">
                        <span class="font-bold">Profil uložen!</span>
                    </Alert>
                {:else}
                    <Alert dismissable color="red" class="p-2.5">
                        <span class="font-bold">Žádné změny k uložení!</span>
                    </Alert>
                {/if}
                <Button type="submit" color="dark" outline disabled={isSubmitting} class="font-black uppercase tracking-wider shadow-lg shadow-primary-900/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Ukládám...' : 'Uložit změny'}
                </Button>
            </div>
        </form>
    </Card>
</div>