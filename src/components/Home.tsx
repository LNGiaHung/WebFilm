// Home.tsx
import React, { useState } from "react";
import Header from "./Navbar";
import Footer from "./Footer";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";

// Define types for content
interface Content {
  title: string;
  image: string;
  description: string;
}

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const genres: string[] = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror"];
  const contentRows = [
    { title: "Popular on Netflix", items: Array(6).fill(null) },
    { title: "Trending Now", items: Array(6).fill(null) },
    { title: "Watch It Again", items: Array(6).fill(null) },
  ];

  const handleContentClick = (content: Content) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  // Define props for ContentModal
  interface ContentModalProps {
    content: Content;
    onClose: () => void;
  }

  const ContentModal: React.FC<ContentModalProps> = ({ content, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={content.image}
            alt={content.title}
            className="object-cover w-full h-full rounded"
          />
        </div>
        <p className="mb-4">{content.description}</p>
        <div className="flex justify-end">
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

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

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
          <h2 className="text-2xl font-bold mb-4">Browse by Genre</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {genres.map((genre, index) => (
              <button
                key={index}
                className="bg-gray-800 text-white px-4 py-2 rounded whitespace-nowrap hover:bg-gray-700"
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        {contentRows.map((row, rowIndex) => (
          <section key={rowIndex} className="container mx-auto px-4 py-8 flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-4">{row.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {row.items.map((_, index) => (
                <div
                  key={index}
                  className="aspect-w-2 aspect-h-3 bg-gray-800 rounded overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() =>
                    handleContentClick({
                      title: `Content ${rowIndex + 1}-${index + 1}`,
                      image: `https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`,
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    })
                  }
                >
                  <img
                    src={`https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
                    alt={`Content ${rowIndex + 1}-${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />

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
