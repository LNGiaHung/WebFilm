import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from 'react-router-dom'; // Add Navigate to the import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider";
import HomePage from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Signup from './components/Signup';
import AuthRoute from './components/ProtectedRoute/AuthRoute';
import ForgotPassword from './components/ForgotPassword';
import NotFound from './components/NotFound'; // Import the NotFound component

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected route for all authenticated users */}
            <Route element={<AuthRoute />}>
              <Route path="/" element={<HomePage />} />
              {/* Protected route for ADMIN users only */}
              <Route element={<AuthRoute allowedRoles={['ADMIN']} />}>
              </Route>
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </AuthProvider>
  );
}


export default App;
