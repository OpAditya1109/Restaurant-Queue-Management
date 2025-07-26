// api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://restaurant-queue-management.onrender.com/api', // Adjust based on your backend
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
