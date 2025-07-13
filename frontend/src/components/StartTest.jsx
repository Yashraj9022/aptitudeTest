import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StartTest.css";
import Usericon from "../assets/login.png";
import axios from "axios";
import './Responsive.css'

const StartTest = ({ token, user, email, handleLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

const [profile, setProfile] = useState({ username: '', email: '',profile_image:'' });

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/api/profile/', {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('hhj');
        console.log(res);
      setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  fetchProfile();
}, []);


  // Optional: If you want to fetch fresh user info from API
  // Example: axios call to get user profile
  // const [profile, setProfile] = useState({});
  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/profile/', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }).then(res => setProfile(res.data));
  // }, [token]);

  const handleStartTest = () => {
    navigate("/test");
  };
 const backendBaseURL = "http://localhost:8000";
  return (
    <>
      {/* Navbar */}
      <nav>
        <div className="logo">MyTestApp</div>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Disclaimer</a></li>
        </ul>

        {/* User Dropdown */}
          <div className="auth-buttons">
            <div className="user-dropdown-container">
               {/* // Django backend address */}

              {/* <img 
                src={user.profile_image ? `${backendBaseURL}${user.profile_image}` : "/default-profile.png"} 
                alt="User Profile" 
                className="profile-image" 
              /> */}
              <img
                src={`${backendBaseURL}${profile.profile_image}`}
                alt="User"
                className="user-logo"
                onClick={toggleDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              />
              {showDropdown && (
                <div
                  className="user-dropdown"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <p><strong>Name : {profile.username}</strong></p>
                  <p>Email : {profile.email}</p>
                  <button onClick="/">Logout</button>
                </div>
              )}
            </div>
          </div>
        
      </nav>

      {/* Header Section */}
      <header>
        <div className="hero-text">
          <h1>Welcome to My Online Test Platform</h1>
          <p>Prepare. Practice. Perform!</p>
        </div>
      </header>

      {/* Start Test Button */}
      <section className="content">
        <div className="register-section">
          <div className="start-btn-section">
            <button className="start-test-btn" onClick={handleStartTest}>
              Start Test
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 MyTestApp. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default StartTest;
