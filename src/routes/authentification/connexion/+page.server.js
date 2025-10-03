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

    const user = await db.loginUser(email);

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

    const name = data.get('name');
    const firstname = data.get('firstname');
    const age = data.get('age');
    const email = data.get('email');
    const password = data.get('password');
    const confirm = data.get('confirm');

    if (!name || !firstname || !age || !email || !password || !confirm) {
      return fail(400, { email, missing: true });
    };

    if (typeof password !== 'string' || password.length < 6) {
      return fail(400, { weakPassword: true });
    };

    if (password !== confirm) {
      return fail(400, { password, incorrect: true });
    };

    const user = await db.createUser(name, firstname, age: Number(age), email, password: db.hash(password));

    cookies.set('sessionid', await db.createSession(user), { path: '/' });

    if (url.searchParams.has('redirectTo')) {
      throw redirect(303, '/mon_compte');
    };

    return { success: true };
  }
};