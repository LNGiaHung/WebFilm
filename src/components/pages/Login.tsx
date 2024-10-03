import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import Header from "../Navbar";
import Footer from "../Footer";

// Define the types for form inputs
type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login Data:", data);
    // Handle login logic here, e.g., API call to authenticate the user
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center relative">
      <Header />
      <main className="flex-grow flex items-center justify-center h-[100vh] w-[100vw]">
        <div className="bg-gray-900 p-8 rounded-lg min-w-md min-h-md">
          <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Email"
                className="bg-gray-800 text-white px-10 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                placeholder="Password"
                className="bg-gray-800 text-white px-10 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-4 flex justify-between">
            <a href="#" className="text-gray-400 hover:text-white">
              Forgot your password?
            </a>
            <Link to="/SignUp">
              <div className="text-gray-400 hover:text-white">
                Sign up
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
