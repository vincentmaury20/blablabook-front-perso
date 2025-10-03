export async function load({ params, id }) {
  const res = await fetch(`http://localhost:3000/book/${params.id}`);
  const book = await res.json();

  console.log(book);

  return { book };
}   