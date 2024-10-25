import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    prefix: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    addressline1: '',
    addressline2: '',
    city: '',
    state: '',
    zipcode: '',
    countrycode: '',
    phone: '',
    bachelorDegree: '',
    bachelorGPA: '',
    md: '',
    mdGPA: '',
    lookingForInternship: '',
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const { firstname, lastname, email, password, zipcode, phone } = formData;
    const errors = {};
    const emailPattern = /^[a-z]+([.]?[a-z0-9]+)*@[a-z]+\.[a-z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!firstname || !/^[a-zA-Z]+$/.test(firstname)) {
      errors.firstname = 'First Name must contain only letters.';
    }
    if (!lastname || !/^[a-zA-Z]+$/.test(lastname)) {
      errors.lastname = 'Last Name is required and must contain only letters.';
    }
    if (!email || !emailPattern.test(email)) {
      errors.email = 'A valid Email is required.';
    }
    if (!password || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    if (!zipcode || !/^[0-9]+$/.test(zipcode)) {
      errors.zipcode = 'Zipcode is required and must contain only numbers.';
    }
    if (!phone || !phonePattern.test(phone)) {
      errors.phone = 'Phone number must be exactly 10 digits.';
    }

    

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

   
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, resume: file });
      setErrors((prevErrors) => ({ ...prevErrors, resume: null }));
    } else {
      setFormData({ ...formData, resume: null });
      setErrors((prevErrors) => ({ ...prevErrors, resume: 'Only PDF files are allowed.' }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
     
    }
  };

  return (
    <div className="page-container">
      <div className="registration-form-container">
        <h2 className="register-title">Professional Development Workshop Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label className="register-label">Prefix:</label>
            <select
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="register-select"
            >
              <option value="">Select</option>
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Dr.</option>
            </select>
          </div>

          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">First Name:</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                
                className="register-input"
              />
              {touched.firstname && errors.firstname && (
                <span className="error">{errors.firstname}</span>
              )}
            </div>
            <div className="register-field">
              <label className="register-label">Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
               
                className="register-input"
              />
              {touched.lastname && errors.lastname && (
                <span className="error">{errors.lastname}</span>
              )}
            </div>
          </div>

          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
               
                className="register-input"
              />
              {touched.email && errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="register-field">
              <label className="register-label">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                
                className="register-input"
              />
              {touched.password && errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>

          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">Address Line 1:</label>
              <input
                type="text"
                name="addressline1"
                value={formData.addressline1}
                onChange={handleChange}
                className="register-input"
              />
            </div>
            <div className="register-field">
              <label className="register-label">Address Line 2:</label>
              <input
                type="text"
                name="addressline2"
                value={formData.addressline2}
                onChange={handleChange}
                className="register-input"
              />
            </div>
          </div>

          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                
                className="register-input"
              />
              {touched.city && errors.city && (
                <span className="error">{errors.city}</span>
              )}
            </div>
            <div className="register-field">
              <label className="register-label">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                
                className="register-input"
              />
              {touched.state && errors.state && (
                <span className="error">{errors.state}</span>
              )}
            </div>
          </div>

          <div className="register-input-group">
            <label className="register-label">Zipcode:</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              
              className="register-input"
            />
            {touched.zipcode && errors.zipcode && (
              <span className="error">{errors.zipcode}</span>
            )}
          </div>

          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">Country Code:</label>
              <select
                name="countrycode"
                value={formData.countrycode}
                onChange={handleChange}
                className="register-select"
              >
                <option value="">Select</option>
                <option value="+1">+1</option>
                <option value="+91">+91</option>
                <option value="+44">+44</option>
              </select>
            </div>
            <div className="register-field">
              <label className="register-label">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              
                className="register-input"
              />
              {touched.phone && errors.phone && (
                <span className="error">{errors.phone}</span>
              )}
            </div>
          </div>

          
          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">Bachelor Degree:</label>
              <input
                type="text"
                name="bachelorDegree"
                value={formData.bachelorDegree}
                onChange={handleChange}
                className="register-input"
              />
            </div>
            <div className="register-field">
              <label className="register-label">Bachelor GPA:</label>
              <input
                type="text"
                name="bachelorGPA"
                value={formData.bachelorGPA}
                onChange={handleChange}
                className="register-input"
              />
            </div>
          </div>

          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">MD Degree:</label>
              <input
                type="text"
                name="md"
                value={formData.md}
                onChange={handleChange}
                className="register-input"
              />
            </div>
            <div className="register-field">
              <label className="register-label">MD GPA:</label>
              <input
                type="text"
                name="mdGPA"
                value={formData.mdGPA}
                onChange={handleChange}
                className="register-input"
              />
            </div>
          </div>

          <div className="register-input-group">
            <div className="register-field">
              <label className="register-label">Looking for Internship:</label>
              <select
                name="lookingForInternship"
                value={formData.lookingForInternship}
                onChange={handleChange}
                className="register-select"
              >
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="register-field">
              <label className="register-label">Resume:</label>
              <input
                type="file"
                accept="application/pdf"
                name="resume"
                onChange={handleFileChange}
                className="register-input"
              />
              {errors.resume && <span className="error">{errors.resume}</span>}
            </div>
          </div>

          <button type="submit" className="register-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
