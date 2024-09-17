import React, { useState, useEffect } from 'react';
import './Profile.css';
import { getprofile,updateProfile } from '../api/Auth-util';
import { useNavigate } from 'react-router-dom';
const UserProfileEdit = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        country: ''
      });

    
      useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const profileData = await getprofile();
            setUserData({
              name: profileData.username || '',
              email: profileData.email || '',
              city: profileData.city || '',
              state: profileData.state || '',
              country: profileData.country || ''
            });
          } catch (error) {
            console.error('Error fetching user profile:', error);
            // You might want to show an error message to the user here
          }
        };
    
        fetchUserProfile();
      }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await updateProfile(userData);
          alert('Profile updated successfully!');
            navigate('/home');
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        }
      };

  return (
    <div className="profile-edit-container">
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <h2>Edit Profile</h2>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            readOnly
            className="read-only"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={userData.state}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={userData.country}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfileEdit;