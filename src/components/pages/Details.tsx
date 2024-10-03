import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define the Movie type
interface Movie {
  _id: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
  Images: string[]; // Array of additional images
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the movie ID from URL parameters
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:2000/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovie(data.movie); // Assuming the API returns an object with the movie key
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie data available</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{movie.Title} ({movie.Year})</h1>
      <img src={movie.Poster} alt={movie.Title} className="mb-4 w-full h-auto rounded-lg" />
      
      <div className="mb-4">
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Rated:</strong> {movie.Rated}</p>
        <p><strong>Released:</strong> {movie.Released}</p>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>Language:</strong> {movie.Language}</p>
        <p><strong>Country:</strong> {movie.Country}</p>
        <p><strong>Awards:</strong> {movie.Awards}</p>
        <p><strong>Metascore:</strong> {movie.Metascore}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        <p><strong>IMDB Votes:</strong> {movie.imdbVotes}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Plot:</h2>
        <p>{movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetail;