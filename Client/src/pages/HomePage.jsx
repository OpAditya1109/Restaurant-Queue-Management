import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCustomer = () => {
    navigate("/customer");
  };

  const handleRestaurantLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-white p-4">
      <div className="absolute top-6 right-6">
        <button
          onClick={handleRestaurantLogin}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Restaurant Login
        </button>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Queue Management System</h1>
        <p className="text-gray-600 mb-8">Join a restaurant queue as a customer</p>
        <button
          onClick={handleCustomer}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg font-medium transition"
        >
          View Restaurants
        </button>
      </div>
    </div>
  );
};

export default HomePage;
