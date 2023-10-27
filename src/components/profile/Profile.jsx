import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import Navbar from "../navbar/Navbar";

function Profile() {
  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.keycloak.role);

  useEffect(() => {
    // You can dispatch an action here to fetch user information if it's not already in the Redux store
  }, []);

  return (
    <div className="profile-container">
      <div className="card profile-card">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="card-body">
          <div className="user-details mt-4">
            <div className="user-detail">
              <strong>Username:</strong> {user.username}
            </div>
            <div className="user-detail">
              <strong>First Name:</strong> {user.firstName}
            </div>
            <div className="user-detail">
              <strong>Last Name:</strong> {user.lastName}
            </div>
            <div className="user-detail">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="user-detail">
              <strong>Role:</strong> {role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
