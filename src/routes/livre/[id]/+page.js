import { API_URL } from '$lib/config.js';

export async function load({ params }) {
  const res = await fetch(`${API_URL}/book/${params.id}`);
  const book = await res.json();

  const resReviews = await fetch(`${API_URL}/books/${params.id}/reviews`);
  const reviews = await resReviews.json();
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  console.log(book);

  return {
    book,
    reviews,
    averageRating: average,
    reviewCount: reviews.length
  };

}   