import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error and success messages
        setError('');
        setSuccess('');

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setSuccess('A reset link has been sent to your email.');
            setEmail('');
        }, 1000);
    };

    return (
        <div className="forgot-password-background">
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Enter your email"  // Placeholder added
                    />
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <button type="submit" className="submit-button">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};
export default ForgotPassword;
