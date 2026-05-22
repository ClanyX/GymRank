import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/';
import { userTable } from '$lib/server/database/schema';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const type = url.searchParams.get('type');
	let next = url.searchParams.get('next');

	if (!next) {
		next = type === 'recovery' ? '/auth/update-password' : '/protected/dashboard';
	}

	if (code) {
		const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error && sessionData?.user) {
			const user = sessionData.user;

			if (type === 'signup' || type === 'invite') {
				const meta = user.user_metadata;

				try {
					await db.insert(userTable).values({
						id: user.id,
						firstName: meta.firstName || '',
						lastName: meta.lastName || '',
						email: user.email || '',
						dateOfBirth: meta.dateOfBirth ? new Date(meta.dateOfBirth) : new Date(),
						gender: meta.gender || 'other',
						weight: meta.weight || 80000,
						role: 'user',
						isTrusted: false,
						createdAt: new Date()
					});
				} catch (dbError) {
					console.error('Chyba při zápisu profilu v callbacku:', dbError);
				}
			}

			throw redirect(303, next);
		}
	}

	if (type === 'recovery') {
		throw redirect(303, '/auth/reset-password?error=Odkaz_neni_platny_nebo_vyprsel');
	} else {
		throw redirect(303, '/login?error=Odkaz_pro_potvrzeni_registrace_vyprsel');
	}
};
