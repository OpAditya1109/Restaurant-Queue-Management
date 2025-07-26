import React, { useState, useEffect } from 'react';

const QueuePanel = () => {
  const [queue, setQueue] = useState([]);
  const [name, setName] = useState('');
  const [userEntry, setUserEntry] = useState(null);
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
    const storedEntry = localStorage.getItem('queueUser');
    if (storedEntry) setUserEntry(JSON.parse(storedEntry));

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

  const joinQueue = async (e) => {
    e.preventDefault();
    if (!name) return;

    const alreadyInQueue = queue.some(q => q.name.toLowerCase() === name.toLowerCase());
    if (alreadyInQueue) {
      alert("You're already in the queue.");
      return;
    }

    try {
      const res = await fetch(`https://restaurant-queue-management.onrender.com/api/queue/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, restaurantId }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('queueUser', JSON.stringify({ name }));
        setUserEntry({ name });
        setName('');
        fetchQueue();
      } else {
        alert(data.message || 'Failed to join queue.');
      }
    } catch (err) {
      console.error('Error joining queue:', err);
    }
  };

  const leaveQueue = async () => {
    if (!userEntry) return;

    try {
      const res = await fetch(`https://restaurant-queue-management.onrender.com/api/queue/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userEntry.name, restaurantId }),
      });

      if (res.ok) {
        localStorage.removeItem('queueUser');
        setUserEntry(null);
        fetchQueue();
      } else {
        alert('Failed to leave queue.');
      }
    } catch (err) {
      console.error('Error leaving queue:', err);
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
        if (userEntry?.name === name) {
          localStorage.removeItem('queueUser');
          setUserEntry(null);
        }
        fetchQueue();
      } else {
        alert('Failed to mark as seated.');
      }
    } catch (err) {
      console.error('Error marking as seated:', err);
    }
  };

  const userPosition = queue.findIndex(q => q.name === userEntry?.name);
  const estimatedWait = userPosition !== -1 ? userPosition * 5 : null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center bg-blue-100 py-3 rounded">
        Restaurant Queue
      </h2>

      {userEntry ? (
        <div className="mt-6 p-4 border rounded shadow">
          <p className="font-semibold text-lg mb-4 text-center">Welcome, {userEntry.name}!</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-600 text-sm">Total in Queue</p>
              <p className="text-xl font-bold">{queue.length}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-600 text-sm">Estimated Wait</p>
              <p className="text-xl font-bold">{estimatedWait} min</p>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-600 text-sm">Your Number</p>
              <p className="text-xl font-bold">{userPosition + 1}</p>
            </div>
          </div>

          <button
            onClick={leaveQueue}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Leave Queue
          </button>
        </div>
      ) : (
        <form onSubmit={joinQueue} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Join Queue
          </button>
        </form>
      )}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Live Queue</h3>
        <ul className="divide-y border rounded">
          {queue.map((entry, idx) => (
            <li key={entry._id} className="p-3 flex justify-between items-center">
              <div>
                <span className="font-medium">{idx + 1}. {entry.name}</span>
                {userEntry?.name === entry.name && (
                  <span className="ml-2 text-green-600 font-medium">(You)</span>
                )}
              </div>
              <button
                onClick={() => markAsSeated(entry.name)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
              >
                Mark as Seated
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueuePanel;
