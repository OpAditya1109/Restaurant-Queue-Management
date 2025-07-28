import React, { useEffect, useState } from 'react';
import { FiUsers, FiClock, FiHash, FiCheckCircle } from 'react-icons/fi';

const QueuePanel = () => {
  const [queue, setQueue] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('restaurantId');
    if (!id) {
      alert('Restaurant ID missing. Please log in again.');
      return;
    }
    setRestaurantId(id);
  }, []);

  useEffect(() => {
    if (!restaurantId) return;
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, [restaurantId]);

  const fetchQueue = async () => {
    try {
      const res = await fetch(`https://restaurant-queue-management.onrender.com/api/queue/${restaurantId}`);
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      console.error('Error fetching queue:', err);
    }
  };

  const markAsSeated = async (name) => {
    if (!window.confirm(`Mark ${name} as seated?`)) return;
    try {
      const res = await fetch(`https://restaurant-queue-management.onrender.com/api/queue/mark-seated`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, restaurantId }),
      });

      if (res.ok) {
        fetchQueue();
      } else {
        alert('Failed to mark as seated.');
      }
    } catch (err) {
      console.error('Error marking as seated:', err);
    }
  };

  const avgWait = queue.length * 3;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 tracking-tight">Queue Management Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={<FiUsers />} label="People in Queue" value={queue.length} color="text-indigo-600" />
        <StatCard icon={<FiClock />} label="Estimated Wait Time" value={`${avgWait} min`} color="text-emerald-600" />
        <StatCard icon={<FiHash />} label="Current Token" value={queue.length ? queue.length : '-'} color="text-amber-600" />
      </div>

      {/* LIVE QUEUE */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 Live Queue</h2>
        {queue.length === 0 ? (
          <p className="text-gray-500 text-center">No customers in the queue.</p>
        ) : (
          <ul className="space-y-5 divide-y divide-gray-200">
            {queue.map((entry, idx) => (
              <li
                key={entry._id}
                className="flex justify-between items-center py-4 px-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-all"
              >
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    #{idx + 1} - {entry.name}{' '}
                    <span className="text-sm text-gray-500">({entry.seats} seat{entry.seats > 1 ? 's' : ''})</span>
                  </p>
                </div>
                <button
                  onClick={() => markAsSeated(entry.name)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none"
                >
                  <FiCheckCircle className="text-white" /> Mark Seated
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col items-center text-center">
    <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
    <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default QueuePanel;
