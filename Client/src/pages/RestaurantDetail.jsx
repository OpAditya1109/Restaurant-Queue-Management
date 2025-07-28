import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [queue, setQueue] = useState([]);
  const [yourNumber, setYourNumber] = useState(null);
  const [name, setName] = useState(localStorage.getItem(`queueName_${id}`) || "");
  const [seats, setSeats] = useState(Number(localStorage.getItem(`queueSeats_${id}`)) || 1);
  const [loading, setLoading] = useState(true);

  // Fetch restaurant details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://restaurant-queue-management.onrender.com/api/restaurant/${id}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Fetch queue repeatedly
  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const res = await axios.get(`https://restaurant-queue-management.onrender.com/api/queue/${id}`);
        setQueue(res.data);
        const storedName = localStorage.getItem(`queueName_${id}`);
        if (storedName) {
          const position = res.data.findIndex((entry) => entry.name === storedName);
          setYourNumber(position !== -1 ? position + 1 : null);
        }
      } catch (err) {
        console.error("Error fetching queue:", err);
      }
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const handleJoin = async () => {
    if (!name.trim()) return alert("Please enter your name.");
    if (seats < 1) return alert("Please choose valid seats.");

    try {
      await axios.post("https://restaurant-queue-management.onrender.com/api/queue/join", {
        name,
        restaurantId: id,
        seats,
      });
      localStorage.setItem(`queueName_${id}`, name);
      localStorage.setItem(`queueSeats_${id}`, seats);
      setYourNumber(queue.length + 1);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join queue.");
    }
  };

  const handleLeave = async () => {
    try {
      await axios.post("https://restaurant-queue-management.onrender.com/api/queue/leave", {
        name,
        restaurantId: id,
      });
      localStorage.removeItem(`queueName_${id}`);
      localStorage.removeItem(`queueSeats_${id}`);
      setYourNumber(null);
      setName("");
      setSeats(1);
    } catch (err) {
      alert("Failed to leave queue.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading restaurant info...</div>;

  if (!restaurant) {
    return <div className="text-center mt-10 text-red-600">Restaurant not found.</div>;
  }

  const avgWaitTime = queue.length * 3;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Restaurant Header */}
      <div className="bg-orange-100 p-6 rounded-lg shadow mb-6 text-center">
        <h1 className="text-3xl font-bold text-orange-700">{restaurant.name}</h1>
        <p className="text-gray-700 mt-2">{restaurant.address}</p>
        <p className="text-sm text-gray-600">Phone: {restaurant.phone}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="People in Queue" value={queue.length} color="blue" />
        <StatCard label="Avg Wait Time" value={`${avgWaitTime} mins`} color="green" />
        {yourNumber && <StatCard label="Your Position" value={yourNumber} color="purple" />}
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {yourNumber ? (
          <>
            <h2 className="text-xl font-semibold text-green-700 mb-4">You're in the Queue!</h2>
            <div className="mb-2 text-gray-700">
              <strong>Name:</strong> {name}
            </div>
            <div className="mb-4 text-gray-700">
              <strong>Seats:</strong> {seats}
            </div>
            <button
              onClick={handleLeave}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Leave Queue
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Join the Queue</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
            <select
              className="w-full border p-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} Seat{i + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <button
              onClick={handleJoin}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              Join Queue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  const colorMap = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
};

export default RestaurantDetail;
