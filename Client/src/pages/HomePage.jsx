import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCustomer = () => navigate("/customer");
  const handleRestaurantLogin = () => navigate("/login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col px-6 py-10">
      {/* Header */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleRestaurantLogin}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Restaurant Login
        </button>
      </div>

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Smart Queue Management for Restaurants
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Allow your customers to join queues online and track their status — say goodbye to
          crowded entrances and long waiting confusion.
        </p>
        <button
          onClick={handleCustomer}
          className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-medium transition"
        >
          View Restaurants (Customers)
        </button>
      </div>

      {/* Live Features */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto w-full mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          What You Can Do Right Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Feature icon="📱" title="Online Queue Joining" text="Customers can join from their phones or at the restaurant — no app required." />
          <Feature icon="📊" title="Live Queue Tracking" text="Restaurant staff manage queues in real-time, customers track their turn." />
          <Feature icon="🔒" title="Membership Access Only" text="Restaurants must register and pay to access the system, keeping it professional." />
          <Feature icon="🧑‍🍳" title="Multi-Restaurant Listing" text="Customers can browse and join queues from any listed restaurant." />
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm p-6 max-w-5xl mx-auto mb-10">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4 text-center">Coming Soon 🚀</h2>
        <ul className="list-disc list-inside text-yellow-700 text-sm space-y-2">
          <li>WhatsApp & SMS Alerts for customers when table is ready</li>
          <li>Real-time analytics for restaurant performance</li>
          <li>Feedback system for customers after visit</li>
          <li>Priority booking / paid fast-lane queueing</li>
        </ul>
      </div>

      {/* Testimonials / Use Cases */}
      <div className="max-w-5xl mx-auto text-center text-gray-700 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Who Is This For?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Testimonial
            title="Small Restaurants"
            text="No more calling out token numbers or crowded waiting areas. Just scan and join."
          />
          <Testimonial
            title="Cloud Kitchens"
            text="Manage limited seating efficiently and improve pickup timing."
          />
          <Testimonial
            title="Multi-Branch Chains"
            text="Track queue flow at multiple outlets with one login."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-white py-10 px-6 rounded-xl shadow-md max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Are You a Restaurant Owner?</h2>
        <p className="text-gray-600 mb-6">
          Start managing queues more professionally with our modern tool. Purchase your membership
          and access your restaurant dashboard now.
        </p>
        <button
          onClick={handleRestaurantLogin}
          className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium transition"
        >
          Login to Dashboard
        </button>
      </div>

      {/* Optional Footer */}
      <footer className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} QueueMaster. All rights reserved.
      </footer>
    </div>
  );
};

// Reusable Feature component
const Feature = ({ icon, title, text }) => (
  <div className="flex items-start space-x-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  </div>
);

// Reusable Testimonial/UseCase component
const Testimonial = ({ title, text }) => (
  <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
    <h4 className="font-bold text-gray-700 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

export default HomePage;
