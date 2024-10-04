import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import Header from "../Navbar";
import Footer from "../Footer";

// Define the types for form inputs
type SignUpFormInputs = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();
  const navigate = useNavigate(); // Hook to navigate

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    console.log("Sign Up Data:", data);

    try {
      const response = await fetch('http://localhost:2000/api/movies/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send form data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User registered successfully:", result);
        navigate(`/login`);
      } else {
        const errorResult = await response.json();
        console.error("Error during registration:", errorResult);
        // Handle error, e.g., show error message
      }
    } catch (error) {
      console.error("Network or server error:", error);
      // Handle network errors
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center relative">
      <Header />
      <main className="flex-grow flex items-center justify-center h-[100vh] w-[100vw]">
        <div className="bg-gray-900 p-8 rounded-lg min-w-md min-h-md">
          <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-between items-center">
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("username", { required: "Name is required" })}
                  placeholder="Name"
                  className="bg-gray-800 text-white px-10 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {errors.username && <p className="text-red-500 mt-2">{errors.username.message}</p>}
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid phone number (10 digits)",
                    },
                  })}
                  placeholder="Phone"
                  className="bg-gray-800 text-white px-10 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {errors.phone && <p className="text-red-500 mt-2">{errors.phone.message}</p>}
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
            </div>
            <button
              type="submit"
              className="w-[50%] bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/Login">
              <div className="text-gray-400 hover:text-white">
                Login
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
