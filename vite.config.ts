import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		SvelteKitPWA({
			strategies: 'generateSW',
			registerType: 'prompt',
			workbox: {
				globPatterns: ['client/**/*.{js,css,html,ico,png,svg,webp}'],
				navigateFallback: null,
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.mode === 'navigate',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'pages-cache',
							expiration: {
								maxEntries: 50
							}
						}
					}
				]
			},
			manifest: {
				name: 'GymRank',
				short_name: 'GymRank',
				description: 'Webová aplikace pro sledování a porovnávání tvého výkonu v posilovně.',
				theme_color: '#111827',
				background_color: '#ffffff',
				display: 'standalone',
				icons: [
					{
						src: 'pwa-192x192-logo.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512-logo.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
		})
	]
});
