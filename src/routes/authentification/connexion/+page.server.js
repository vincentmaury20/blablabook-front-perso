import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/server/db';
import type { error } from 'console';

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

    const user = await db.getUser(email); /* Ce n'est pas plutôt loginUser, d'après le controller en back ? */

    if (!user || user.password !== db.hash(password)) {
      return fail(400, { email, incorrect: true });
    };

    cookies.set('sessionid', await db.createSession(user), { path: '/' });

    if (url.searchParams.has('redirectTo')) {
      throw redirect(303, '/mon_compte');
    };

    return { success: true };
  },

  register: async ({ cookies, request, url }) => {
    const data = await request.formData();

    const lastName = data.get('lastname');
    const firstName = data.get('firstName');
    const age = data.get('age');
    const email = data.get('email');
    const password = data.get('password');
    const confirm = data.get('confirm');

    if (!lastName || !firstName || !age || !email || !password || !confirm) {
      return fail(400, { email, missing: true });
    };

    if (password.length < 6) {
      return fail(400, { weakPassword: true });
    };

    if (password !== confirm) {
      return fail(400, { password, incorrect: true });
    };

    const user = await db.createUser(lastName, firstName, age: Number(age), email, password: db.hash(password));

    cookies.set('sessionid', await db.createSession(user), { path: '/' });

    if (url.searchParams.has('redirectTo')) {
      throw redirect(303, '/mon_compte');
    };

    return { success: true };
  }
};