/* Vercel Analytics */
import { dev } from '$app/environment';

import { injectAnalytics } from '@vercel/analytics/sveltekit';
injectAnalytics({ mode: dev ? 'development' : 'production' });

import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
injectSpeedInsights();