import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Navbar";
import Footer from "./Footer";

// Define types for content
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

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:2000/api/movies/get");
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleContentClick = (movie: Movie) => {
    setSelectedContent(movie);
    setShowModal(true);
  };

  // ContentModal component with drag-to-scroll functionality
  const ContentModal: React.FC<{ content: Movie; onClose: () => void }> = ({ content, onClose }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate(); // Hook to navigate

    const handleMouseDown = (e: React.MouseEvent) => {
      if (scrollRef.current) {
        const startX = e.clientX;
        const scrollLeft = scrollRef.current.scrollLeft;

        const handleMouseMove = (e: MouseEvent) => {
          const x = e.clientX - startX;
          scrollRef.current!.scrollLeft = scrollLeft - x;
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    };

    const handleDetailsClick = () => {
      onClose(); // Close the modal
      navigate(`/details/${content.imdbID}`, { state: { movie: content } }); // Redirect with movie data
    };


    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-8 rounded-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-4">{content.Title} ({content.Year})</h2>
          <p className="mb-4">{content.Plot}</p>
          <p><strong>Director:</strong> {content.Director}</p>
          <p><strong>Actors:</strong> {content.Actors}</p>
          <p><strong>Genre:</strong> {content.Genre}</p>
          <p><strong>Rated:</strong> {content.Rated}</p>
          <p><strong>Runtime:</strong> {content.Runtime}</p>
          <p><strong>Released:</strong> {content.Released}</p>

          {/* Image Gallery with Drag-to-Scroll */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 mt-4 cursor-grab scrollbar-hide"
            onMouseDown={handleMouseDown}
          >
            {content.Images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index + 1}`}
                className="h-32 w-auto rounded-lg object-cover"
                draggable={false} // Prevent dragging
              />
            ))}
          </div>

          <div className="flex justify-between mt-4 gap-4">
            <button
              onClick={handleDetailsClick}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Details
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="pt-20">
        <section className="relative">
          <img
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Featured Content"
            className="w-full h-[70vh] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 items-start flex-col flex p-8 bg-gradient-to-t from-black">
            <h2 className="text-4xl font-bold mb-2">Featured Title</h2>
            <p className="mb-4 max-w-2xl text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Play
            </button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4">Browse Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="relative aspect-w-2 aspect-h-3 bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 shadow-lg"
                onClick={() => handleContentClick(movie)}
              >
                <img
                  src={movie.Images[1]}
                  alt={movie.Title}
                  className="object-cover w-full h-full rounded-lg transition-transform duration-300"
                  draggable={false} // Prevent dragging
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                  <p className="text-white text-lg font-bold">{movie.Title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {showModal && selectedContent && (
        <ContentModal
          content={selectedContent}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Home;