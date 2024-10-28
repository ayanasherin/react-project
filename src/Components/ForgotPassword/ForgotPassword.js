import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import './ForgotPassword.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const notify = (message) => toast(message);

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
            
           notify('Password reset link sent to your email.!')
            setEmail('');
        } catch (err) {
            setError('User doesnot exist.!.'); 
            notify('User doesnot exist.!')
            
        }
    };

    return (
        <div className="forgot-password-background">
            <div className="forgot-password-container">
            <ToastContainer />
                <h2 className='ForgotPassword-h2' >Forgot Password</h2>
                <form className='ForgotPassword-form' onSubmit={handleSubmit}>
                    <label className='forgotpassword-label' htmlFor="email">Email Address</label>
                    <input  className='forgotpassword-input'
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Enter your email"  
                    />
                    {error && <div className="forgotpassword-error">{error}</div>}
                    {success && <div className="forgotpassword-success">{success}</div>}
                    <button type="submit" className="forgotpassword-submit-button">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
