import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/';
import { userTable } from '$lib/server/database/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const type = url.searchParams.get('type');
	const token_hash = url.searchParams.get('token_hash');

	if (token_hash && type) {
		const { data: sessionData, error } = await supabase.auth.verifyOtp({
			token_hash,
			type: type as unknown as 'recovery' | 'signup' | 'email',
		});

		if (type === 'recovery') {
			throw redirect(303, `/auth/update-password?code=${token_hash}`);
		}

		if (!error && sessionData?.user) {
			const user = sessionData.user;
			const meta = user.user_metadata;

			if (meta) {
				try {
					const existing = await db
						.select()
						.from(userTable)
						.where(eq(userTable.id, user.id))
						.limit(1);

					if (existing.length === 0) {
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
					}
				} catch (dbError) {
					console.error('Chyba při zápisu profilu v callbacku:', dbError);
				}

				throw redirect(303, '/app/dashboard');
			}
			throw redirect(303, '/app/dashboard');
		} else if (error) {
			console.error('Chyba při exchangeCodeForSession:', error.message);
		}
	}

	if (type === 'recovery') {
		throw redirect(303, '/auth/reset-password?error=Odkaz_vyprsel_nebo_je_neplatny');
	}

	throw redirect(303, '/login?error=Potvrzovaci_odkaz_je_neplatny_nebo_vyprsel');
};
