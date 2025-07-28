import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
fetch("https://restaurant-queue-management.onrender.com/api/restaurant/all")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  const handleJoinQueue = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Available Restaurants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {restaurant.name}
              </h3>
              <p className="text-gray-500">{restaurant.address}</p>
              <p className="text-gray-500">Phone: {restaurant.phone}</p>
            </div>
            <button
              onClick={() => handleJoinQueue(restaurant._id)}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Join Queue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPage;
