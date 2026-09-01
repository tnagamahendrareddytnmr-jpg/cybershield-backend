import axios from 'axios';

const API_BASE_URL = "https://cybershield-backend-1-138u.onrender.com";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `${API_BASE_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
export { API_BASE_URL };