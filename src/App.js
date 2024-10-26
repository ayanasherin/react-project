import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login state from localStorage
  };

  // Check localStorage to set initial state on refresh
  React.useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
