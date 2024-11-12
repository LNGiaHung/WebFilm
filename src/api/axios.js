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

let isRefreshing = false;
let failedQueue = [];

// Process queue function
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
}, error => {
  return Promise.reject(error);
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Handle token refresh only if the response was 401 (Unauthorized)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Add request to queue if refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }
      
      // Mark original request as retry to prevent endless loop
      originalRequest._retry = true;
      isRefreshing = true;

      // Attempt to refresh the token
      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh`, null, { withCredentials: true });
        const { accessToken } = response.data;

        // Update local storage with new token
        localStorage.setItem('accessToken', accessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Process the queue with the new token
        processQueue(null, accessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle failure of token refresh
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        Cookies.remove('refreshToken');
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    // Reject if response is not 401 or retry failed
    return Promise.reject(error);
  }
);

export default axiosInstance;
