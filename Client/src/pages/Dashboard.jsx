import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    inQueue: 0,
    avgWait: 0,
  });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const restaurantId = localStorage.getItem("restaurantId");

    const fetchDashboard = async () => {
      try {
        const res = await fetch("https://restaurant-queue-management.onrender.com/api/restaurant/dashboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch dashboard");

        const data = await res.json();
        const { profile } = data;

        setProfile({
          name: profile.name,
          email: profile.email,
          address: profile.address || "",
          phone: profile.phone || "",
        });
      } catch (err) {
        console.error("Dashboard fetch failed:", err.message);
      }
    };

    const fetchLiveStats = async () => {
      try {
        const res = await fetch(`https://restaurant-queue-management.onrender.com/api/queue/${restaurantId}/stats`);
        if (!res.ok) throw new Error("Failed to fetch queue stats");

        const data = await res.json();
        setStats({
          inQueue: data.inQueue,
          avgWait: data.avgWaitTime,
        });
      } catch (err) {
        console.error("Live stats fetch failed:", err.message);
      }
    };

    fetchDashboard();
    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <StatCard title="Currently in Queue" value={stats.inQueue} color="bg-yellow-100" />
        <StatCard title="Avg. Wait Time (min)" value={stats.avgWait} color="bg-purple-100" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-lg font-semibold mb-4">Restaurant Profile</h2>

        <div className="grid gap-4">
          <InputField label="Restaurant Name" name="name" value={profile.name} disabled />
          <InputField label="Email" name="email" value={profile.email} disabled />
          <InputField label="Address" name="address" value={profile.address} disabled />
          <InputField label="Phone Number" name="phone" value={profile.phone} disabled />
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/queue-panel")}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Go to Queue Panel
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-xl shadow ${color}`}>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const InputField = ({ label, name, value, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      disabled={disabled}
      className="w-full p-2 border rounded-lg bg-gray-100"
    />
  </div>
);

export default Dashboard;
