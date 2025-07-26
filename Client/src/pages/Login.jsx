import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/auth/login', formData);
    const { token, restaurant } = res.data;

    console.log("Restaurant Response:", restaurant); // 👈 debug line

    localStorage.setItem('token', token);
    localStorage.setItem('restaurantId', restaurant._id);  // must log proper ID
    localStorage.setItem('restaurantName', restaurant.name);

    setMessage('Login successful!');
    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || 'Error occurred');
  }
};


  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Restaurant Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleRegisterRedirect}
          className="w-full mt-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
        >
          Don't have an account? Register
        </button>

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
