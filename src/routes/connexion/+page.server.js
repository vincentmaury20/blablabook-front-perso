import { redirect, fail } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
  login: async ({ request }) => {
    console.log(request)
    const formData = await request.formData();

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return fail(400, { missing: true, error: 'Veuillez remplir tous les champs' });
    }
    try {

      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        return fail(res.status, { error: 'Email ou mot de passe incorrect' });
      }

      throw redirect(303, '/mon_compte');
    } catch (err) {
      console.error('Erreur login :', err);
      return fail(500, { error: 'Erreur serveur, veuillez réessayer' });
    }
  },


  register: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const firstname = data.get('firstname');
    const age = data.get('age');
    const email = data.get('email');
    const password = data.get('password');
    const confirm = data.get('confirm');

    if (!name || !firstname || !age || !email || !password || !confirm) {
      return fail(400, { missing: true, error: "Tous les champs sont obligatoires" });
    };

    if (typeof password !== 'string' || password.length < 6) {
      return fail(400, { weakPassword: true });
    };

    if (password !== confirm) {
      return fail(400, { password, incorrect: true });
    };

    try {
      const res = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, firstname, age, email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        return fail(res.status, { error: data.error || `Erreur lors de l'inscription` });
      }
      throw redirect(303, '/mon_compte');
    } catch (err) {
      console.error('Erreur register :', err);
      return fail(500, { error: 'Erreur serveur, veuillez réessayer' });
    }
  }
};