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
    <section className="py-8 h-[100vh] flex items-center justify-center bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          
          {/* Poster Image */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img className="w-full dark:hidden" src={movie.Images[1]} alt={movie.Title} />
            <img className="w-full hidden dark:block" src={movie.Images[1]} alt={movie.Title} />
          </div>

          {/* Movie Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {movie.Title} ({movie.Year})
            </h1>
            
            {/* Director, Actors, Genre, Rating */}
            <div className="mt-4 sm:items-top sm:gap-4 sm:flex">
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Director:</strong> {movie.Director}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Rated:</strong> {movie.Rated}
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                <strong>Released:</strong> {movie.Released}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Runtime:</strong> {movie.Runtime}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Language:</strong> {movie.Language}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Country:</strong> {movie.Country}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                <strong>Awards:</strong> {movie.Awards}
              </p>
            </div>

            {/* IMDB & Metascore */}
            <div className="mt-6 flex items-center gap-2">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                IMDB Rating: {movie.imdbRating}
              </p>
              <div className="flex items-center gap-2">
                {/* Dynamically render stars based on the IMDB rating */}
                {Array.from({ length: 5 }, (_, index) => {
                  const rating = parseFloat(movie.imdbRating) / 2; // Convert to a 5-star scale
                  const fullStar = index + 1 <= rating;
                  const halfStar = index + 1 > rating && index + 0.5 < rating;

                  return (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${fullStar ? 'text-yellow-300' : halfStar ? 'text-yellow-300' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={fullStar || halfStar ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {fullStar ? (
                        <path d="M12 17.27l6.18 3.64-1.64-7.03 5.46-4.73-7.12-.61L12 2 9.12 8.54l-7.12.61 5.46 4.73-1.64 7.03L12 17.27z" />
                      ) : halfStar ? (
                        <path d="M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4zM12 2v13.27l3.76 2.27 1-4.28-3.32-2.88L12 2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 7.82 21l1.18-6.88-5-4.87 6.91-1.01L12 2z" />
                      )}
                    </svg>
                  );
                })}
              </div>
            </div>
            <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
              {movie.imdbVotes} votes
            </p>
            <div className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              <strong>Metascore:</strong> {movie.Metascore}
            </div>

            {/* Plot */}
            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Plot:</h2>
            <p className="text-gray-500 dark:text-gray-400">{movie.Plot}</p>
          </div>
        </div>
      </div>
    </section>

  );
};

export default MovieDetail;