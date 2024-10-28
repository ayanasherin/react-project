import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(null);
  const [isConfirmPasswordActive, setIsConfirmPasswordActive] = useState(false);
  const notify = (message) => toast(message);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");
    setToken(tokenParam);
    console.log("Token from URL:", tokenParam); 
  }, [location]);

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(
        password
      )
    ) {
      return "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    let newErrors = { ...errors };

   
    if (name === "newPassword") {
      newErrors.newPassword = validatePassword(value);
    }

    
    if (name === "confirmNewPassword" || name === "newPassword") {
      if (isConfirmPasswordActive && formData.newPassword !== value) {
        newErrors.confirmNewPassword = "Passwords do not match";
      } else {
        newErrors.confirmNewPassword = "";
      }
    }

    setErrors(newErrors);
    setSuccessMessage("");
  };

  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordActive(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    newErrors.newPassword = validatePassword(formData.newPassword);

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).some((key) => newErrors[key])) return;

    try {
      const response = await fetch("http://localhost:8080/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmNewPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        notify("Password reset successful");
        
        setTimeout(()=>{
          navigate('/login')
        },2000);
      } else {
        setErrors({
          confirmNewPassword: data.error || "Failed to reset password.",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setErrors({
        confirmNewPassword: "An error occurred while resetting the password.",
      });
    }
  };

  return (
    <div className="reset-password-background">
      <div className="reset-password-container">
        <h2 className="resetpassword-h2">Reset Password</h2>
        <form className = "resetpassword-form"id="resetPasswordForm" onSubmit={handleSubmit}>
          <label className="resetpassword-label" htmlFor="new-password">New Password:</label>
          <input className="resetpassword-input"
            type="password"
            id="new-password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          {errors.newPassword && (
            <div className="error">{errors.newPassword}</div>
          )}

          <label className="resetpassword-label" htmlFor="confirm-new-password">Confirm New Password:</label>
          <input  className="resetpassword-input"
            type="password"
            id="confirm-new-password"
            name="confirmNewPassword"
            placeholder="Confirm new password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            onFocus={handleConfirmPasswordFocus}
            required
          />
          {isConfirmPasswordActive && errors.confirmNewPassword && (
            <div className="resetpassword-error">{errors.confirmNewPassword}</div>
          )}

          <div className="resetpassword-success">{successMessage}</div>
          <button type="submit" className="resetpassword-submit-button">
            Reset Password
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
