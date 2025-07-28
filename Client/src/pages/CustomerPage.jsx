import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";

const CustomerPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restaurant-queue-management.onrender.com/api/restaurant/all")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setFilteredRestaurants(data);
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  const handleJoinQueue = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = restaurants.filter((r) =>
      r.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 py-12 text-center text-white shadow">
        <h1 className="text-4xl font-bold mb-2">Find Your Favorite Restaurant</h1>
        <p className="text-lg">Join the queue and avoid waiting in line</p>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <input
          type="text"
          placeholder="Search restaurants by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
        />
      </div>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-10">
        {filteredRestaurants.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">No restaurants found.</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-semibold text-green-700">
                    {restaurant.name}
                  </h3>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock size={14} /> Open Now
                  </span>
                </div>

                {restaurant.address && (
                  <p className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {restaurant.address}
                  </p>
                )}

                {restaurant.phone && (
                  <p className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {restaurant.phone}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleJoinQueue(restaurant._id)}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium transition"
              >
                Join Queue
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
