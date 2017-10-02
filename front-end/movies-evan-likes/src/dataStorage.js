import Data from '../api/data.json';

const movieData = Data.movies;
const reviewData = Data.reviews;

// cache API data
if (!window.localStorage.getItem('movie-data') || !window.localStorage.getItem('review-data')) {
  populateStorage();
}

function populateStorage() {
  window.localStorage.setItem('movie-data', JSON.stringify(movieData));
  window.localStorage.setItem('review-data', JSON.stringify(reviewData));
}

const dataObj = {};
dataObj.movies = JSON.parse(window.localStorage.getItem('movie-data'));
dataObj.reviews = JSON.parse(window.localStorage.getItem('review-data'));

export default dataObj;

