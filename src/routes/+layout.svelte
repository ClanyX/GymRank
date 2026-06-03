<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase.js';
	import type { Session } from '@supabase/supabase-js';
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavUl, NavLi, GradientButton, Dropdown, DropdownHeader, Avatar, DropdownGroup, DropdownItem } from 'flowbite-svelte';
	import { page } from '$app/state';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink, FooterIcon } from 'flowbite-svelte';
  	import { GithubSolid, EnvelopeSolid } from 'flowbite-svelte-icons';
	import ReloadPrompt from '$lib/components/ReloadPrompt.svelte';

	/* PWA */
	import { pwaInfo } from 'virtual:pwa-info';
	let webManifest = $derived(pwaInfo?.webManifest);

	let activeUrl = $derived(page.url.pathname);
	let activeClass = "font-bold text-gray-700 bg-gray-300 dark:text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 md:hover:bg-transparent md:dark:hover:bg-transparent md:text-gray-700 md:dark:text-white ";
  	let nonActiveClass = "text-gray-700 dark:text-gray-400 dark:hover:text-gray-400 hover:bg-transparent dark:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-400 ";

	let { data, children } = $props();
	let session = $derived(data.session);

	// Listen for changes to the user's authentication state and invalidate the session data when it changes
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event: string, _session: Session | null) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	{#if webManifest}
		<link
			rel="manifest"
			href={webManifest.href}
			crossorigin={webManifest.useCredentials ? 'use-credentials' : undefined}
		/>
	{/if}
</svelte:head>

<ReloadPrompt />

<div class="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
	<div class="relative">
		<Navbar class="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-300 bg-gray-200/95 px-2 py-2.5 backdrop-blur-sm sm:px-4 dark:border-gray-700 dark:bg-gray-800/95">
			<NavBrand href="/"> <!-- h-6 only with alpha/beta text otherwise h-9 (img) -->
				<img src="/logo.svg" class="me-3 h-6 sm:h-12" alt="gym-logo" />
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">GymRank</span>
				<span class="ml-2 mt-3 text-xs font-semibold whitespace-nowrap text-gray-500">BETA</span>
			</NavBrand>
  			<div class="flex md:order-2 gap-1">
				{#if !session} <!-- TODO: size="xs" only with alpha/beta text otherwise size="sm" -->
	    			<GradientButton href="/login" pill shadow color="purpleToBlue" size="xs">PŘIHLÁSIT</GradientButton >
				{:else}
					<div class="flex items-center md:order-2">
    					<Avatar class="cursor-pointer h-9 w-9 md:h-12 md:w-12" id="avatar-menu" src="/profil-img.png" />
  					</div>
					<Dropdown placement="bottom" triggeredBy="#avatar-menu">
						<DropdownHeader>
      						<span class="block text-sm">{data.userData?.firstName} {data.userData?.lastName}</span>
      						<span class="block truncate text-sm font-medium">{data.userData?.email}</span>
						</DropdownHeader>
						<DropdownGroup>
							<DropdownItem href="/app/profile">Profil</DropdownItem>
      						<DropdownItem href="/app/dashboard">Dashboard</DropdownItem>
      						<DropdownItem href="/app/exercises/hall-of-fame">Síň slávy</DropdownItem>
      						<DropdownItem href="/app/exercises/allexercises">Žebříček</DropdownItem>
      						<DropdownItem href="/app/exercises/wilksscore">Wilks Score</DropdownItem>
    					</DropdownGroup>
						<DropdownGroup>
							<form method="POST" action="/?/logout" use:enhance>
	    						<button class="w-full" type="submit">
	        						<DropdownItem>Odhlásit se</DropdownItem>
								</button>
							</form>
						</DropdownGroup>
					</Dropdown>
				{/if}
				<DarkMode />
    			<NavHamburger />
  			</div>
			
				<NavUl transition={scale} transitionParams={{ y: 0.6, duration: 300 }} { activeUrl } classes={{ active: activeClass, nonActive: nonActiveClass }}>
					<NavLi href="/">DOMŮ</NavLi>
					{#if !session}
						<NavLi href="/about">O PROJEKTU</NavLi>
						<NavLi href="/contact">KONTAKT & PODPORA</NavLi>
						<NavLi href="/credits">CREDITS</NavLi>
					{:else}
						<NavLi href="/app/dashboard">DASHBOARD</NavLi>
						<NavLi href="/app/profile">PROFIL</NavLi>
						<NavLi href="/app/exercises/hall-of-fame">SÍŇ SLÁVY</NavLi>
						<NavLi href="/app/exercises/allexercises">ŽEBŘÍČEK</NavLi>
						<NavLi href="/app/exercises/wilksscore">WILKS SCORE</NavLi>
					 {/if}
				</NavUl>
		</Navbar>
	</div>
	<div class="h-19 sm:h-22"></div>
	<main class="pt-2 grow">
	  {@render children()}
	</main>

	<Footer footerType="logo" class="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 p-8">
  		<div class="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-6">
    		<div class="flex flex-col items-center md:items-start">
    		  <div class="flex items-center gap-2 mb-2">
    		    <span class="text-2xl font-black italic tracking-tighter text-primary-600">GYMRANK</span>
    		  </div>
    		  <p class="text-sm text-gray-500 dark:text-gray-400 font-light italic">
    		    Posouvej své hranice, každé kilo se počítá.
    		  </p>
    		</div>

    		<FooterLinkGroup class="flex flex-wrap justify-center gap-6 uppercase font-bold text-xs tracking-widest text-gray-600 dark:text-gray-400">
    		  <FooterLink href="/">Domů</FooterLink>
    		  <FooterLink href="/about">O projektu</FooterLink>
    		  <FooterLink href="/contact">Kontakt & Podpora</FooterLink>
    		  <FooterLink href="/credits">Credits</FooterLink>
			  <FooterLink href="/terms">Podmínky použití</FooterLink>
    		</FooterLinkGroup>

    		<div class="flex space-x-6">
    		  <FooterIcon href="https://github.com/ClanyX/Gym_Ranking.git" target="_blank" class="text-gray-500 hover:text-primary-600">
    		    <GithubSolid class="w-5 h-5" />
    		  </FooterIcon>
    		  <FooterIcon href="mailto:info@gymrank.cz" class="text-gray-500 hover:text-primary-600">
    		    <EnvelopeSolid class="w-5 h-5" />
    		  </FooterIcon>
    		</div>
  		</div>

  		<hr class="my-6 border-gray-200 dark:border-gray-800 sm:mx-auto" />

  		<div class="text-center">
  		  <FooterCopyright href="/credits" by="Filip Šandera" year={2026} class="font-serif italic text-sm" />
  		  <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-2">
  		    Built with SvelteKit & Supabase
  		  </p>
  		</div>
	</Footer>
</div>
