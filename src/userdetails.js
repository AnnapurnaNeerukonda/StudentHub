import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/userdetail.css'; 

const UserDetails = () => {
  const [user, setUser] = useState({
    profilePic: '',
    username: '',
    email: ''
  });
  const [newEmail, setNewEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const uid = localStorage.getItem('uid');
      try {
        const response = await axios.get(`http://localhost:4000/user-details/${uid}`);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/update-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser((prevUser) => ({
        ...prevUser,
        profilePic: response.data.profilePic,
      }));
    } catch (err) {
      setError('Failed to upload profile picture');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async () => {
    try {
      await axios.post('http://localhost:4000/send-otp', { email: newEmail });
      setOtpSent(true);
    } catch (err) {
      setError('Failed to send OTP');
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:4000/update-details', {
        username: user.username,
        email: user.email,
      });
      alert('Details updated successfully');
    } catch (err) {
      setError('Failed to update details');
    }
  };

  return (
    <div className="user-details-container">
      <h1>User Details</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="profile-pic-container">
        <img
          src={user.profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-pic"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          disabled={loading}
        />
        {loading && <p>Loading...</p>}
      </div>
      <div className="details-form">
        <label>
          Username:
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {otpSent ? (
            <p>OTP sent to your email. Please verify.</p>
          ) : (
            <button onClick={handleEmailChange}>Send OTP</button>
          )}
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default UserDetails;
