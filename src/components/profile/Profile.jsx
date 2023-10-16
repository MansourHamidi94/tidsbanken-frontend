import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
    const [darkMode, setDarkMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [theme, setTheme] = useState('light'); // default to light mode



    const submitPasswordChange = () => {
        // Logic to handle password change
        // For example, you can validate the new password, check if the current password is correct, etc.
        // After validation and processing, you can send a request to the backend to update the password.

        // For now, let's just print the passwords to the console:
        console.log("Current Password: ", currentPassword);
        console.log("New Password: ", newPassword);
        console.log("Repeat New Password: ", repeatNewPassword);

        // After processing, close the modal:
        handleCloseModal();
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };
    
    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [theme]);
    
    const handleHome = () => {
        // Redirect to the main page
        // For example, if you're using react-router:
        // navigate('/');
    };


    return (

        <div className="container mt-5">

            <div className="card profile-card">
                <div className="card-body">
                    {/* Profile Picture */}

                    <div className="d-flex flex-column align-items-center">
                        <img src="logo.jpg" alt="Profile" className="profile-pic" />
                        <input type="text" className="form-control mb-2 username-input" placeholder="UserName" />
                        <button className="btn btn-primary mt-2">Change Picture</button>
                    </div>


                    {/* User Details */}
                    <div className="mt-4">
                        <input type="text" className="form-control mb-2" placeholder="First Name" />
                        <input type="text" className="form-control mb-2" placeholder="Last Name" />
                        <input type="number" className="form-control mb-2" placeholder="Age" />
                        <input type="email" className="form-control mb-2" placeholder="E-Mail" />
                        <button className="btn btn-primary" onClick={handleOpenModal}>Change Password</button>
                    </div>
                    {/* Password Change Modal */}
                    <div className={showModal ? 'modal' : 'modal display-none'}>
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <h3>Change Password</h3>
                            <input type="password" className="form-control mb-2" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                            <input type="password" className="form-control mb-2" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <input type="password" className="form-control mb-2" placeholder="Repeat New Password" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} />
                            <button className="btn btn-primary" onClick={submitPasswordChange}>Submit</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-primary" onClick={submitPasswordChange}>Submit</button>
                        <button className="btn btn-secondary" onClick={handleHome}>Home</button>

                    </div>
                </div>
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
    );
}

export default Profile;
