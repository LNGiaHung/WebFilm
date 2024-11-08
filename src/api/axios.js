import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(request => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        console.log(refreshToken)
        const response = await axios.post(`http://localhost:5000/api/v1/auth/refresh`, {
          refreshToken,
        });
        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken);
        console.log("token refreshed")
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
