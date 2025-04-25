// import the moviecard to create cards for movies...
import MovieCard from "../components/MovieCard";
// the below are react hooks to manage the state of the component
// useState is used to create state variables
// useEffect is used to perform side effects in the component
// useEffect is used to fetch the data from the api when the component is mounted
import { useState, useEffect } from "react";
// the 2 functions are used to fetch the data from the api
// searchMovies is used to search for movies
// getPopularMovies is used to get the popular movies
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
// this contains the whole UI of home page
function Home() {
  // searchQuery is used to store the value of the search input
  // setSearchQuery is used to update the value of the search input
  const [searchQuery, setSearchQuery] = useState("");
  // save the movies in state, when updated it will re-render the component
  const [movies, setMovies] = useState([]);
  // one state for storing the error..
  const [error, setError] = useState(null);
  // onse state for storing the loading state..
  const [loading, setLoading] = useState(true);

  // this is the useEffect function that will run when the component is mounted
  // it will fetch the data from the api and set the movies state
  // the empty array is used to run the useEffect only once when the component is mounted
  // if we pass a value in the array, it will run the useEffect when the value changes
  useEffect(() => {
    // the below is a function
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false); // no loading..
      }
    };

    loadPopularMovies();
  }, []); // dependency array

  const handleSearch = async (e) => {
    e.preventDefault(); // it used to prevent to update the page and refreshing..
    if (!searchQuery.trim()) return // removes the spaces..
    if (loading) return // if loading is true, then return

    setLoading(true)
    try {
      // the below function is used to search for movies
      // it will call the searchMovies function and pass the searchQuery as a parameter
      // it will return the movies that match the search query
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false) // no loading..
    }
  };

  return (
    <div className="home">
      {/* the below form component is used to search for movies.. */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
{/* if theres an error, it will show the error. */}
        {error && <div className="error-message">{error}</div>}
        {/* the below code mentions that if we are loading then it mentions that it is loading otherwise it will display the movies.. */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        // we use map to iterate over the movies array and create a MovieCard for each movie
        // enclose it in parantheses to return the value
        // we use the key prop to give a unique key to each movie card
        // we use the movie.id as the key
        // we use the movie prop to pass the movie object to the MovieCard component
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
