import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);


    const navigate = useNavigate();
    const location = useLocation(); 

    console.log(isLoggedIn)

    useEffect(()=>{
      setIsLoggedIn(localStorage.getItem('isLoggedIn'))
    })
    const handleLogout = () => {
        
        localStorage.clear();
      
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link className="navbar-brand" to="/">Home</Link>
                <div className="nav-links">
                    {location.pathname === '/dashboard' && isLoggedIn ? (
                        <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                    ) : (
                        <>
                            {!isLoggedIn && location.pathname !== '/login' && (
                                <Link className="nav-link" to="/login">Login</Link>
                            )}
                            {!isLoggedIn && location.pathname !== '/register' && (
                                <Link className="nav-link" to="/register">Register</Link>
                            )}
                             {isLoggedIn && (
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            )}
                             {isLoggedIn && location.pathname !== '/dashboard' && (
                                <Link onClick={handleLogout} className="nav-link" to="/dashboard">Logout</Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
