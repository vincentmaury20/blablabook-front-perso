import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const user = await db.getUserFromSession(cookies.get('sessionid'));
  return { user };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  login: async ({ cookies, request, url }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email) {
      return fail(400, { email, missing: true });
    };

    const user = await db.getUser(email);

    if (!user || user.password !== db.hash(password)) {
      return fail(400, { email, incorrect: true });
    };

    cookies.set('sessionid', await db.createSession(user), { path: '/' });

    if (url.searchParams.has('redirectTo')) {
        /* throw */ redirect(303, '/mon_compte');
    };

    return { success: true };
  },
  register: async (event) => {
    // TODO inscrire l'utilisateur
  }
};