// src/components/UserProfile.js
import React from 'react';
import './UserProfile.css'; // Importing the CSS for styling

const UserProfile = () => {
  const user = {
    name: "Nosa Ihuaku", // You can fetch or replace this with dynamic user data
    email: "chi.ihuaku@gmail.com",
    bio: "Frontend developer at Afrigem Beauty, passionate about creating delightful user experiences.",
    location: "Lagos, Nigeria",
    profilePicture: "https://via.placeholder.com/150" // Replace with dynamic user image or local path
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-details">
        <h3>Bio</h3>
        <p>{user.bio}</p>
        <h3>Location</h3>
        <p>{user.location}</p>
      </div>
      <button className="edit-profile-btn">Edit Profile</button>
    </div>
  );
};

export default UserProfile;
