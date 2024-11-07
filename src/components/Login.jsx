import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, auth, user } = useAuth();

  const redirectBasedOnRole = (user) => {
    if (user && user.roles && user.roles.length > 0) {
      const role = user.roles[0].name;
      switch (role) {
        case 'ADMIN':
          navigate('/dashboard');
          break;
        case 'LEADER':
          navigate('/projectlist');
          break;
        default:
          navigate('/studentregister');
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (auth.accessToken && user) {
      console.log("User:", user);
      redirectBasedOnRole(user);
    }
  }, [auth.accessToken, user, navigate]);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);
      const response = await axiosInstance.post('/auth/token', {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        console.log("Response:", response);
        const accessToken = response.data.result.token;
        console.log("Login successful. Token received:", accessToken);

        try {
          const userData = await login({ accessToken });
          toast.success("Login successful!", { autoClose: 1000 });
          console.log("User data after login:", userData);
          setTimeout(() => {
            redirectBasedOnRole(userData.result);
          }, 1500);
        } catch (userError) {
          console.error('Error fetching user data:', userError);
          toast.error("Error fetching user data. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || "An error occurred during login. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 font-jakarta">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 mx-auto md:h-screen md:px-6 lg:px-8 lg:py-12">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-poppins">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-inter">Username</label>
                <input
                  type="text"
                  {...register("username", { required: "Username is required" })}
                  className="w-full p-2.5 font-inter"
                />
                {errors.username && <p className="text-red-500 mt-2 font-inter">{errors.username.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-inter">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full p-2.5 font-inter"
                />
                {errors.password && <p className="text-red-500 mt-2 font-inter">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <input
                    id="rememberMe"
                    {...register("rememberMe")}
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <label htmlFor="rememberMe" className="ml-3 text-sm text-gray-500 dark:text-gray-300 font-inter">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline dark:text-primary-500 font-inter">Forgot password?</Link>
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-poppins rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400 font-inter">
                Don't have an account yet? <Link to="/signup" className="text-primary-600 hover:underline dark:text-primary-500 font-inter">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
