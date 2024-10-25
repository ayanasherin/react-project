import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-form-section">
            <h2 className='login-heading'>Welcome back..!!</h2>
            <form>
              <div className="login-form-group">
                <label className='login-label' htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" />
              </div>
              <div className="login-form-group">
                <label className='login-label' htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />
              </div>
              <div className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className="login-btn">Login</button>
              <p className="signup-msg">
                Don't have an account? <a href="/register">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
