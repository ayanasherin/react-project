import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/userlogin', { email, password });
      
      if (response.status === 200) {
        const { firstname} = response.data; 
        console.log(firstname)
        localStorage.setItem('firstname', firstname); 
        localStorage.setItem('isLoggedIn',true)
        navigate('/dashboard'); 
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Invalid credentials....!!');
          notify("Invalid credentials...!!");
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form-section">
          <h2 className='login-heading'>Welcome back..!!</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label className='login-label' htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(''); 
                }}
                required
              />
            </div>
            <div className="login-form-group">
              <label className='login-label' htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(''); 
                }}
                required
              />
            </div>
            {errorMessage && <div className="login-error-message">{errorMessage}</div>} 
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'} 
            </button>
            <p className="signup-msg">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
