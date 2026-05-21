import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server';
import { userTable } from '$lib/server/database/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
    default: async({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const captchaToken = formData.get('captchaToken') as string;

        if(!captchaToken) {
            //fail(400, { error: 'Captcha je požadována!' });
            return fail(400, { message: 'Captcha je požadována!' });
        }

        if(!email || !password) {
            //fail(400, { error: 'Email a Heslo jsou požadovány!' });
            return fail(400, { message: 'Email a Heslo jsou požadovány!' });
        }

        const { error } = await supabase.auth.signInWithPassword({ 
            email,
            password,
            options: {
                captchaToken,
            }
        });

        if(error){
            //fail(400, { error: 'Neplatné prihlášovací udaje!' });
            return fail(400, { message: 'Neplatné prihlášovací udaje!' });
        }

        try{
            await db.update(userTable)
                .set({ lastSignInAt: new Date() })
                .where(eq(userTable.email, email));
        }catch(e){
            console.error(e);
        }
        throw redirect(303, '/app/dashboard');
    }
};