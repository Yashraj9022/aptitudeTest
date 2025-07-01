import React, { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './responsive.css'
import Popup from "./Popup";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    captchaInput: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();
const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, username, email, password, captchaInput } = formData;
    let error = "";

    if (!firstName || !lastName || !username || !email || !password || !captchaInput) {
      setPopup({
        show: true,
        message: "All Fields are required",
        type: "error"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    setPopup({
        show: true,
        message: "Invalid Email.",
        type: "error"
      });
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passRegex.test(password)) {
      setPopup({
        show: true,
        message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        type: "error"
      });
      // error +=
      //   "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.\n";
    }

    if (captchaInput !== captcha) {
      setPopup({
        show: true,
        message: "Captcha not match",
        type: "error"
      });
    }

    if (!profileImage) {
      setPopup({
        show: true,
        message: "Please select profile Image",
        type: "error"
      });
      // error += "Please select a profile image.\n";
    }

    if (error) {
      alert(error);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profile_image", profileImage);

    try {
      await axios.post("http://localhost:8000/api/register/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPopup({
        show: true,
        message: "Registration successfull..",
        type: "success"
        
      });
      // alert("Registration Successful! Please login.");
      
    } catch (error) {
      console.error(error);
      // setPopup({
      //   show: true,
      //   message: "Registration failed. Please try again.",
      //   type: "error"
      // });
      // alert(
      //   "Registration failed: " +
      //     (error.response?.data?.message || JSON.stringify(error.response?.data) || "Server error")
      // );
    }
  };

   const handlePopupClose = () => {
    setPopup({ show: false, message: "", type: "" });
    navigate("/");
  };

  return (
    <div className="register-container">
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ show: false, message: "", type: "" })}
        />
      )}
      <h2>Register for MyTestApp</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="file-upload">
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            required
          />
        </div>

        <div className="captcha-box">
          <span className="captcha-text">{captcha}</span>
          <button type="button" onClick={generateCaptcha}>
            Refresh Captcha
          </button>
        </div>

        <input
          type="text"
          name="captchaInput"
          placeholder="Enter Captcha"
          value={formData.captchaInput}
          onChange={handleChange}
          required
        />

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
{popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handlePopupClose}
        />
      )}
      
    </div>
  );
};

export default Register;
