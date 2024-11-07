import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="flex-grow mx-auto grid max-w-screen-xl px-4 pb-8 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white sm:text-5xl xl:text-6xl">
            404 - Page Not Found
          </h1>
          <p className="mb-6 max-w-2xl text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Sorry, the page you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:text-sm md:px-6 md:py-3.5 md:text-base"
          >
            Go to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound; 