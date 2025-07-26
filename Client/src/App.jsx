import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QueuePanel from './pages/QueuePanel';
import CustomerPage from './pages/CustomerPage';
import RestaurantDetail from './pages/RestaurantDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/queue-panel" element={<QueuePanel />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
