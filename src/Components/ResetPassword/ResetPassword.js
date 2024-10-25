import React from 'react';
import './ResetPassword.css'; // Import your CSS file here

export default function ResetPassword() {
  return (
    <div className="reset-password-background">
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <form id="resetPasswordForm">
          <label htmlFor="new-password">New Password:</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            placeholder="Enter new password"
            required
          />

          <label htmlFor="confirm-new-password">Confirm New Password:</label>
          <input
            type="password"
            id="confirm-new-password"
            name="confirm-new-password"
            placeholder="Confirm new password"
            required
          />

          <div className="error" id="error-message"></div>
          <div className="success" id="success-message"></div>
          <button type="submit" className="submit-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
