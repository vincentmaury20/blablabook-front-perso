export async function load({ fetch, url }) {
  const page = url.searchParams.get('page') || '1';
  const limit = '10';
  const search = url.searchParams.get('search') || '';

  // Construire l'URL avec ou sans recherche
  let apiUrl = `http://localhost:3000/catalog?page=${page}&limit=${limit}`;
  if (search) {
    apiUrl += `&search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(apiUrl);
  const data = await res.json();

  // return { 
  //   books: data.books,
  //   page: data.page,
  //   totalPages: data.totalPages,
  //   search: search
  //  };
  return { ...data, search };
};