import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const captchaToken = formData.get('captchaToken') as string;

		if (!captchaToken) {
			return fail(400, { error: 'Captcha je požadována!' });
		}

		if (!email) {
			return fail(400, { error: 'E-mail je povinný' });
		}

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			captchaToken
		});

		if (error) {
			return fail(400, { error: error.message });
		}

		return { success: true };
	}
};