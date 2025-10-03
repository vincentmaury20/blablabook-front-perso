// import { fail, redirect } from '@sveltejs/kit';
// import * as db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

/* @type {import('./$types').PageServerLoad}
export async function load({ cookies }) {
  const user = await db.getUserFromSession(cookies.get('sessionid'));
  return { user };
} */

/** @satisfies {import('./$types').Actions} */
export const actions = {
  login: async ({ /**cookies,*/ request/* , url */ }) => {
    console.log(request)
    const formData = await request.formData();

    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {

      console.log('Connexion réussie');
      // const data = await res.json();
      throw redirect(303, '/mon_compte');
      // return { success: true, user: data.user };
    } else {
      return { success: false, error: 'Echec de la connexion' };
    }
  }
};

//     if (!email) {
//       return fail(400, { email, missing: true });
//     };

//     const user = await db.loginUser(email);

//     if (!user || user.password !== db.hash(password)) {
//       return fail(400, { email, incorrect: true });
//     };

//     cookies.set('sessionid', await db.createSession(user), { path: '/' });

//     if (url.searchParams.has('redirectTo')) {
//       throw redirect(303, '/mon_compte');
//     };

//     return { success: true };
//   },

//   register: async ({ cookies, request, url }) => {
//     const data = await request.formData();

//     const name = data.get('name');
//     const firstname = data.get('firstname');
//     const age = data.get('age');
//     const email = data.get('email');
//     const password = data.get('password');
//     const confirm = data.get('confirm');

//     if (!name || !firstname || !age || !email || !password || !confirm) {
//       return fail(400, { email, missing: true });
//     };

//     if (typeof password !== 'string' || password.length < 6) {
//       return fail(400, { weakPassword: true });
//     };

//     if (password !== confirm) {
//       return fail(400, { password, incorrect: true });
//     };

//     const user = await db.createUser(name, firstname, Number(age), email, db.hash(password));

//     cookies.set('sessionid', await db.createSession(user), { path: '/' });

//     if (url.searchParams.has('redirectTo')) {
//       throw redirect(303, '/mon_compte');
//     };

//     return { success: true };
//   }
// };