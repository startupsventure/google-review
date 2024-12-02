// script.js
const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
const placeId = 'YOUR_GOOGLE_PLACE_ID'; // Get your Place ID from Google

const fetchReviews = async () => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews,user_ratings_total&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract reviews and rating
    const { rating, user_ratings_total, reviews } = data.result;
    document.querySelector('.rating').innerText = `${rating} (${user_ratings_total} reviews)`;

    // Display reviews
    const reviewsContainer = document.getElementById('reviews');
    reviews.slice(0, 5).forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review';
      reviewDiv.innerHTML = `
        <p><strong>${review.author_name}</strong> (${review.rating} ★)</p>
        <p>${review.text}</p>
      `;
      reviewsContainer.appendChild(reviewDiv);
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

fetchReviews();
