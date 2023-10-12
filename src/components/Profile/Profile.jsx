import React, { useState } from 'react';
import './Profile.css'; // Assuming you have a CSS file for styling

function Profile() {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
        // Additional logic to apply the theme can be added here
    };

    return (
        <div className="container mt-5">
            <div className="card profile-card">
                <div className="card-body">
                    {/* Profile Picture */}
                    <div className="d-flex justify-content-center">
                        <img src="path_to_profile_picture" alt="Profile" className="profile-pic" />
                        <button className="btn btn-primary mt-2">Change Picture</button>
                    </div>

                    {/* User Details */}
                    <div className="mt-4">
                        <input type="text" className="form-control mb-2" placeholder="First Name" />
                        <input type="text" className="form-control mb-2" placeholder="Last Name" />
                        <input type="number" className="form-control mb-2" placeholder="Age" />
                        <input type="email" className="form-control mb-2" placeholder="E-Mail" />
                        <input type="text" className="form-control mb-2" placeholder="UserName" />
                        <input type="password" className="form-control mb-2" placeholder="Password" />
                        <button className="btn btn-secondary mt-2">Change Password</button>
                    </div>

                    {/* Theme Section */}

                    <label className="form-check-label" htmlFor="themeToggle">
                        Theme
                    </label>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="themeToggle"
                            onChange={handleThemeToggle}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;
