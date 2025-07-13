import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';  // Pencil icon
import './Responsive.css'

const Navbar = ({ handleLogout }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profile, setProfile] = useState({ username: '', email: '', profile_image: '' });

  const fileInputRef = useRef(null);
  const backendBaseURL = "http://localhost:8000";

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setPreviewUrl(backendBaseURL + res.data.profile_image);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleImageClick = () => {
    setShowProfileModal(true);
  };

  const handlePencilClick = () => {
    fileInputRef.current.click();   // Trigger hidden input
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('profile_image', file);

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:8000/api/upload-profile-pic/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Profile picture updated!');
        window.location.reload();
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image');
      }
    }
  };

  return (
    <>
      <nav>
        <div className="logo">MyTestApp</div>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Disclaimer</a></li>
        </ul>

        <div className="auth-buttons">
          <div className="user-dropdown-container">
            <img
              src={previewUrl}
              alt="User"
              className="user-logo"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </nav>

      {showProfileModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>User Profile</h2>

            <div className="profile-image-container">
              <img
                src={previewUrl}
                alt="Profile"
                className="profile-pic"
              />
              <FaPencilAlt className="edit-icon" onClick={handlePencilClick} />
            </div>

            <p><strong>Name:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />

            <button onClick={() => setShowProfileModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
