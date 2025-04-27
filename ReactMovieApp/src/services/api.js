import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;  // Access the key

const BASE_URL = "https://api.themoviedb.org/3";

// Function to get popular movies
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Function to search for movies
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};
