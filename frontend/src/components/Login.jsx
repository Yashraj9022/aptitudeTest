// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ setToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/login/', { username, password });
//       setToken(res.data.access);
//       localStorage.setItem('token', res.data.access);
//       navigate('/start-test');
//     } catch {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './responsive.css'
import Popup from "./Popup";
const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captchaChecked: false,
  });

  const navigate = useNavigate();
const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, captchaChecked } = formData;

    let error = "";

    if (!username || !password) {
      setPopup({
        show: true,
        message: "Username and Password are required!",
        type: "Error"
      });
      // error += "Username and Password are required.\n";
    }
    if (!captchaChecked) {
      setPopup({
        show: true,
        message: "Please verify captcha (tick the checkbox).!",
        type: "Error"
      });
      // error += "Please verify captcha (tick the checkbox).\n";
    }

    if (error) {
      alert(error);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      setToken(res.data.access);
      localStorage.setItem("token", res.data.access);
      setPopup({
        show: true,
        message: "Login Succefull..",
        type: "success"
      });
      navigate("/start-test");
    } catch (err) {
      setPopup({
        show: true,
        message: "Please Enter Currect Username or Password!",
        type: "Error"
      });
      // alert("Login failed. Please check your username and password.");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
       {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ show: false, message: "", type: "" })}
        />)}
      <h2>User Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
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

        <div className="captcha-box">
          <input
            type="checkbox"
            name="captchaChecked"
            checked={formData.captchaChecked}
            onChange={handleChange}
          />
          <label>accept Terms and conditions</label>
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p className="register-link">
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>Register Here</span>
      </p>
      
    </div>
  );
};

export default Login;
