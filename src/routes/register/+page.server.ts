import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/index';
import { userTable } from '$lib/server/database/schema';
import type { Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
		const firstName = (formData.get('firstName') as string).trim();
		const lastName = (formData.get('lastName') as string).trim();
        const dateOfBirth = formData.get('dateOfBirth') as string;
		const weight = parseFloat(formData.get('weight') as string);
		const gender = formData.get('gender') as 'male' | 'female' | 'other';
		const terms = formData.get('terms') as string;

		const honeypot = formData.get('honeypot') as string;

		if (honeypot) {
			return fail(400, { message: 'Bot detected!' });
		}

		if (terms !== 'on') {
			return fail(400, { message: 'Musíte souhlasit s podmínkami.' });
		}

		const cleanFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
		const cleanLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

		const correctWeight = Math.round(weight * 1000);

		if (!email || !password || !cleanFirstName || !cleanLastName || !dateOfBirth || !correctWeight || !gender || !confirmPassword) {
			return fail(400, { message: 'Všechna pole jsou povinná.' });
		}

		if(password.length < 7) {
			return fail(400, { message: 'Heslo musí být alespoň 8 znaků dlouhé.' });
		}

        if (password !== confirmPassword) {
            return fail(400, { message: 'Hesla se neshodují.' });
        }

		try {
			const { data: existingUser, error: existingUserError } = await supabase.from('users').select('id').eq('email', email).single();

			if (existingUserError && existingUserError.code !== 'PGRST116') {
				console.error('Chyba při kontrole existujícího uživatele:', existingUserError);
				return fail(500, { message: 'Chyba serveru při kontrole uživatele.' });
			}

			if (existingUser) {
				return fail(400, { message: 'Uživatel s tímto emailem již existuje.' });
			}
		} catch (error) {
			console.error('Chyba při kontrole existujícího uživatele:', error);
			return fail(500, { message: 'Chyba serveru při kontrole uživatele.' });
		}

		const { data: authData, error: authError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					firstName: cleanFirstName,
				}
			},
		});

		if (authError || !authData.user) {
			return fail(400, { message: 'Chyba při registraci: ' + authError?.message });
		}

        const userId = authData.user.id;

		try {
			await db.insert(userTable).values({
				id: userId,
				firstName: cleanFirstName,
				lastName: cleanLastName,
				email,
				dateOfBirth: new Date(dateOfBirth),
				gender,
				weight: correctWeight,
                role: 'user',
                isTrusted: false,
                createdAt: new Date(),
			});
		} catch (dbError) {
			console.error('Drizzle error, spouštím rollback:', dbError);

            const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
            if(deleteError) {
                console.error('Chyba při mazání uživatele po selhání registrace:', deleteError);
            }
			return fail(500, { message: 'Profil se nepodařilo vytvořit.' });
		}

		throw redirect(303, '/register/success');
	}
};