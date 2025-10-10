export async function load({ fetch, url }) {
  const page = url.searchParams.get('page') || '1';
  const limit = '10';

  const res = await fetch(`http://localhost:3000/catalog?page=${page}&limit=${limit}`);
  const data = await res.json();

  // return { 
  //   books: data.books,
  //   page: data.page,
  //   totalPages: data.totalPages
  //  };
  return data;
};