import React from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/forgot-password', {
        email: data.email,
      });

      if (response.status === 200) {
        toast.success("Password reset email sent. Please check your inbox.", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 font-jakarta">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 mx-auto md:h-screen md:px-6 lg:px-8 lg:py-12">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-poppins">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-inter">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-inter"
                />
                {errors.email && <p className="text-red-500 mt-2 font-inter">{errors.email.message}</p>}
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-poppins">
                Reset Password
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400 font-inter">
                Remember your password? <Link to="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-500 font-inter">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
