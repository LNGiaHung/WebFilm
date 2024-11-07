import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedUser = localStorage.getItem('user');
    if (storedAuth) setAuth(storedAuth);
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (authData) => {
    try {
      setAuth(authData);
      localStorage.setItem('auth', JSON.stringify(authData));

      const userResponse = await axiosInstance.get('/users/myInfo', {
        headers: { Authorization: `Bearer ${authData.accessToken}` }
      });
      setUser(userResponse.data.result);
      localStorage.setItem('user', JSON.stringify(userResponse.data.result));

      return userResponse.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const logout = () => {
    setAuth({});
    setUser(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  };

  const getAccessToken = () => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth).accessToken : null;
  };

  return (
    <AuthContext.Provider value={{ auth, user, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};