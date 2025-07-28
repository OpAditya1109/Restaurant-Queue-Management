import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [queue, setQueue] = useState([]);
  const [yourNumber, setYourNumber] = useState(null);
  const [name, setName] = useState(localStorage.getItem(`queueName_${id}`) || "");
  const [seats, setSeats] = useState(localStorage.getItem(`queueSeats_${id}`) || 1);

  // Fetch restaurant info
  useEffect(() => {
    axios
      .get(`https://restaurant-queue-management.onrender.com/api/restaurant/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error("Error fetching restaurant:", err));
  }, [id]);

  // Auto-refresh queue every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`https://restaurant-queue-management.onrender.com/api/queue/${id}`)
        .then((res) => {
          setQueue(res.data);
          const storedName = localStorage.getItem(`queueName_${id}`);
          const storedSeats = localStorage.getItem(`queueSeats_${id}`);
          if (storedSeats) setSeats(storedSeats);
          if (storedName) {
            const pos = res.data.findIndex((entry) => entry.name === storedName);
            setYourNumber(pos !== -1 ? pos + 1 : null);
          }
        })
        .catch((err) => console.error("Error auto-refreshing queue:", err));
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  const handleJoinQueue = async () => {
    if (!name.trim()) return alert("Please enter your name");
    if (!seats || seats < 1) return alert("Please select number of seats");

    try {
      await axios.post("https://restaurant-queue-management.onrender.com/api/queue/join", {
        name,
        restaurantId: id,
        seats,
      });

      localStorage.setItem(`queueName_${id}`, name);
      localStorage.setItem(`queueSeats_${id}`, seats);

      const updatedQueue = await axios.get(`https://restaurant-queue-management.onrender.com/api/queue/${id}`);
      const pos = updatedQueue.data.findIndex((entry) => entry.name === name);
      setQueue(updatedQueue.data);
      setYourNumber(pos + 1);
    } catch (err) {
      alert(err.response?.data?.message || "Error joining queue");
    }
  };

  const handleLeaveQueue = async () => {
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

      const updatedQueue = await axios.get(`https://restaurant-queue-management.onrender.com/api/queue/${id}`);
      setQueue(updatedQueue.data);
    } catch (err) {
      alert("Error leaving queue");
    }
  };

  const avgWaitTime = queue.length * 3;

  if (!restaurant) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4">
      {/* Restaurant Banner */}
      <div className="bg-orange-200 text-center py-6 rounded-md shadow-md mb-6">
        <h1 className="text-3xl font-bold text-orange-800">{restaurant.name}</h1>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Queue</h2>
          <p className="text-2xl font-bold text-blue-600">{queue.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Avg Wait Time</h2>
          <p className="text-2xl font-bold text-green-600">{avgWaitTime} mins</p>
        </div>
        {yourNumber && (
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Your Number</h2>
            <p className="text-2xl font-bold text-purple-600">{yourNumber}</p>
          </div>
        )}
      </div>

      {/* Join/Leave Queue */}
      <div className="bg-white shadow rounded-lg p-4 max-w-md mx-auto">
        {!yourNumber ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Join the Queue</h2>
            <input
              type="text"
              className="border rounded w-full p-2 mb-4"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-sm text-gray-600 mb-1">Select total seats required</p>

            <select
              className="border rounded w-full p-2 mb-4"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Seat{i + 1 > 1 && "s"}
                </option>
              ))}
            </select>

            <button
              onClick={handleJoinQueue}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
            >
              Join Queue
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">You're in the Queue!</h2>
            <p className="text-gray-600 mb-2">Name: <strong>{name}</strong></p>
            <p className="text-gray-600 mb-4">Seats: <strong>{seats}</strong></p>
            <button
              onClick={handleLeaveQueue}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Leave Queue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
