
import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const logout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Router>
    <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


      </Routes>
  </Router>
  );
}

export default App;
