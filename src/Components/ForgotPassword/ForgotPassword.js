import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError('');
        setSuccess('');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/forgot-password', { email });
            setSuccess(response.data); 
           alert('Password reset link sent to your email.!')
            setEmail('');
        } catch (err) {
            setError('User doesnot exist.!.'); 
            alert('User doesnot exist.!');
        }
    };

    return (
        <div className="forgot-password-background">
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Enter your email"  
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
