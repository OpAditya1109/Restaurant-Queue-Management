import React from "react";
import { useNavigate } from "react-router-dom";
import { FaQrcode, FaUsers, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import { MdRestaurant, MdFastfood } from "react-icons/md";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Banner with Image */}
      <div className="relative">
        <img
          src="Queue_restaurant_1.webp"
          alt="Restaurant Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center px-4">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Revolutionize Your Restaurant's Queue Experience
            </h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Let your customers join the line remotely, reduce wait times, and boost satisfaction.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/customer")}
                className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100"
              >
                View Restaurants
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-green-700"
              >
                Restaurant Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold mb-2">Why Choose QueueMaster?</h2>
          <p className="text-gray-600">Features designed to make both customers and restaurants happy</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Feature icon={<FaQrcode />} title="QR Based Entry" desc="Scan and join queues with ease." />
          <Feature icon={<FaMobileAlt />} title="Live Updates" desc="Track your position in real time." />
          <Feature icon={<FaUsers />} title="Unlimited Queues" desc="Handle high traffic efficiently." />
          <Feature icon={<FaCheckCircle />} title="Reliable System" desc="Secure and fast performance." />
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold mb-2">Who Benefits?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          <UseCase icon={<MdRestaurant />} title="Dine-in Restaurants" desc="Manage rush hours like a pro." />
          <UseCase icon={<MdFastfood />} title="Cloud Kitchens" desc="Streamline pickups and reduce clutter." />
          <UseCase icon={<FaUsers />} title="Franchise Chains" desc="Centralized queue control at scale." />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-yellow-100 py-12 px-6 text-yellow-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Coming Soon 🚀</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>WhatsApp & SMS Alerts when your table is ready</li>
            <li>Restaurant performance analytics</li>
            <li>Customer feedback and rating system</li>
            <li>Priority booking for premium users</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Are You a Restaurant Owner?</h2>
        <p className="text-gray-600 mb-6">Start managing queues professionally with QueueMaster.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Access Dashboard
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-6 text-sm">
        &copy; {new Date().getFullYear()} QueueMaster. All rights reserved.
      </footer>
    </div>
  );
};

// Feature Card
const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4 bg-white rounded-xl shadow-md p-5">
    <div className="text-3xl text-green-600">{icon}</div>
    <div>
      <h4 className="font-semibold text-lg mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

// Use Case Card
const UseCase = ({ icon, title, desc }) => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-sm text-center">
    <div className="text-4xl mb-3 text-green-700 mx-auto">{icon}</div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default HomePage;
