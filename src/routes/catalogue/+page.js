export async function load({ fetch }) {
  const res = await fetch(`http://localhost:3000/catalog`);
  const books = await res.json();

//   console.log(books);
  console.log(books[5]);
  
  

  return { books };
}