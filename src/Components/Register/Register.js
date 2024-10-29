import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    prefix: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    addressline1: "",
    adressline2: "",
    city: "",
    state: "",
    zipcode: "",
    countrycode: "",
    phone: "",
    bachelorDegree: "",
    bachelorGPA: "",
    md: "",
    mdGPA: "",
    lookingForInternship: null,
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const validate = () => {
    const newErrors = {};
    if (!formData.prefix) newErrors.prefix = "Prefix is required";
    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.firstname)) {
      newErrors.firstname = "First name must only contain letters";
    }
    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lastname)) {
      newErrors.lastname = "Last name must only contain letters";
    }
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character";
    }

    if (!formData.addressline1)
      newErrors.addressline1 = "Address Line 1 is required";
    if (!formData.adressline2)
      newErrors.adressline2 = "Address Line 1 is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipcode) newErrors.zipcode = "Zip code is required";
    else if (!/^[0-9]+$/.test(formData.zipcode))
      newErrors.zipcode = "Zipcode is required and must contain only numbers.";
    if (!formData.countrycode)
      newErrors.countrycode = "Country code is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}/.test(formData.phone))
      newErrors.phone = "Phone number should contain numbers and length 10";
    if (formData.bachelorGPA < 0 || formData.bachelorGPA > 4.0)
      newErrors.bachelorGPA = "GPA must be between 0 and 4.0";
    if (formData.mdGPA < 0 || formData.mdGPA > 4.0)
      newErrors.mdGPA = "GPA must be between 0 and 4.0";

    console.log(newErrors);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files,type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        lookingForInternship: checked, 
      }));
      return;
    }
    if ((name === 'firstname' || name === 'lastname') && /[^a-zA-Z\s]/.test(value)) {
      return; 
    }
    if((name === 'zipcode') && /[^0-9]/.test(value)){
      return;
    }
    if((name === 'phone') && /[^0-9]/.test(value)){
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    if (submitted) {
      validate();
    }
  }, [formData, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      const formDataToSend = new FormData();
      formDataToSend.append("prefix", formData.prefix);
      formDataToSend.append("firstname", formData.firstname);
      formDataToSend.append("lastname", formData.lastname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("addressline1", formData.addressline1);
      formDataToSend.append("adressline2", formData.adressline2);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("zipcode", formData.zipcode);
      formDataToSend.append("countrycode", formData.countrycode);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("bachelorDegree", formData.bachelorDegree);
      formDataToSend.append("bachelorGPA", formData.bachelorGPA);
      formDataToSend.append("md", formData.md);
      formDataToSend.append("mdGPA", formData.mdGPA);
      formDataToSend.append("lookingForInternship", formData.lookingForInternship);
      if (formData.lookingForInternship !== null) {
        formDataToSend.append("lookingForInternship", formData.lookingForInternship);
    }
      
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/api/register",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        notify("Registration successful!");
        console.log("Registration successful:", response.data);
        setTimeout(()=>{
          navigate('/login')
        },2000);
      } catch (error) {
        console.error("Error registering:", error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          notify(errorMessage);
        } else {
          notify("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      console.log("Form contains errors.");
    }
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, resume: file });
      setErrors((prevErrors) => ({ ...prevErrors, resume: null }));
    } else {
      setFormData({ ...formData, resume: null });
      setErrors((prevErrors) => ({
        ...prevErrors,
        resume: "Only PDF files are allowed.",
      }));
    }
  };

  return (
    <div className="page-container">
      <div className="registration-form-container">
        <ToastContainer/>
        <h2 className="register-title">
          Professional Development Workshop Registration Form
        </h2>
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
            {errors.prefix && <span className="error">{errors.prefix}</span>}
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
              {errors.firstname && (
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
              {errors.lastname && (
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
              {errors.email && <span className="error">{errors.email}</span>}
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
              {errors.password && (
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
              {errors.addressline1 && (
                <span className="error">{errors.addressline1}</span>
              )}
            </div>
            <div className="register-field">
              <label className="register-label">Address Line 2:</label>
              <input
                type="text"
                name="adressline2"
                value={formData.adressline2}
                onChange={handleChange}
                className="register-input"
              />
              {errors.adressline2 && (
                <span className="error">{errors.adressline2}</span>
              )}
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
              {errors.city && <span className="error">{errors.city}</span>}
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
              {errors.state && <span className="error">{errors.state}</span>}
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
            {errors.zipcode && <span className="error">{errors.zipcode}</span>}
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
              {errors.countrycode && (
                <span className="error">{errors.countrycode}</span>
              )}
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
              {errors.phone && <span className="error">{errors.phone}</span>}
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
              {errors.bachelorDegree && (
                <span className="error">{errors.bachelorDegree}</span>
              )}
            </div>
            <div className="register-field">
              <label className="register-label">Bachelor GPA:</label>
              <input
                type="number"
                name="bachelorGPA"
                value={formData.bachelorGPA}
                onChange={handleChange}
                className="register-input"
              />
              {errors.bachelorGPA && (
                <span className="error">{errors.bachelorGPA}</span>
              )}
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
                type="number"
                name="mdGPA"
                value={formData.mdGPA}
                onChange={handleChange}
                className="register-input"
              />
              {errors.mdGPA && <span className="error">{errors.mdGPA}</span>}
            </div>
          </div>

          <div className="register-input-group">
            {/* <div className="register-field">
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
            </div> */}
            {/* <div className="register-field">
              <label className="register-label">Resume:</label>
              <input
                type="file"
                accept="application/pdf"
                name="resume"
                onChange={handleFileChange}
                className="register-input"
              />
              {errors.resume && <span className="error">{errors.resume}</span>}
            </div> */}
            <div>
          <label>
            Looking for Internship:
            <input className="register-chkbox"
              type="checkbox"
              checked={formData.lookingForInternship === true} 
              onChange={handleChange}
            />
          </label>
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

          <button type="submit" className="register-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
