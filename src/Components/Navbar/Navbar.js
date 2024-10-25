import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, logout }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                <div className="nav-links">
                    {!isLoggedIn && location.pathname !== '/login' && (
                        <Link className="nav-link" to="/login">Login</Link>
                    )}
                    {!isLoggedIn && location.pathname !== '/register' && (
                        <Link className="nav-link" to="/register">Register</Link>
                    )}
                    {isLoggedIn && (
                        <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
