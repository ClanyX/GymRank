import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase }, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const captchaToken = formData.get('captchaToken') as string;

		if (!captchaToken) {
			return fail(400, { error: 'Captcha je požadována!' });
		}

		if (!email) {
			return fail(400, { error: 'E-mail je povinný' });
		}

		const redirectTo = `${url.origin}/auth/callback?action=reset-password`;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
			captchaToken
		});

		if (error) {
			return fail(400, { error: error.message });
		}

		return { success: true };
	}
};