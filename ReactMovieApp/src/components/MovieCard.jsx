import "../css/MovieCard.css" // import the css
import { useMovieContext } from "../contexts/MovieContext"

// this function displays the movie card
// it takes the movie object as a prop
// it displays the movie poster, title, release date and a favorite button
function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)
// the below function is called when the user clicks on the favorite button , onclickevent gets triggered...
    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }
// this div displays the movie card
    return <div className="movie-card">
        <div className="movie-poster">
             {/* the image is put dynamically, so we use curly braces in the src.. */}
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            {/* this div contains a button which allows us to like the movie */}
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
         {/* this div contains the movie title and release date and it is present inside the movie card */}
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard