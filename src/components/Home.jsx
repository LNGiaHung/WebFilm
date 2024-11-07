import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="flex-grow mx-auto grid max-w-screen-xl px-4 pb-8 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white sm:text-5xl xl:text-6xl">
            Welcome to Our Platform
          </h1>
          <p className="mb-6 max-w-2xl text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Discover amazing features and services tailored just for you.
          </p>
          {auth.accessToken ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:text-sm md:px-6 md:py-3.5 md:text-base"
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:text-sm md:px-6 md:py-3.5 md:text-base"
            >
              Login
            </button>
          )}
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img
            className="w-full rounded-lg object-contain dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
          <img
            className="hidden w-full rounded-lg object-contain dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
