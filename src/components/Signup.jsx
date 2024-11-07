import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthProvider';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/');
    }
  }, [auth.accessToken, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/users', {
        username: data.username,
        password: data.password,
        email: data.email,
      });

      if (response.status === 200) {
        toast.success('Signup successful! Redirecting to login...', {
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-jakarta">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white font-poppins">
          Create your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-700 focus:ring-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-inter"
              />
              {errors.username && <p className="mt-2 text-sm text-red-600 font-inter">{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain at least one uppercase letter, one number, and one special character",
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-700 focus:ring-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-inter"
              />
              {errors.password && <p className="mt-2 text-sm text-red-600 font-inter">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-700 focus:ring-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-inter"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600 font-inter">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 font-poppins"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 font-inter">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-400 font-inter">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
