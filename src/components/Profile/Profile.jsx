import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; 

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [theme, setTheme] = useState('light'); // default to light mode
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");





    const submitPasswordChange = () => {
        // Logic to handle password change

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

    const handleSubmitChanges = async () => {
        // Construct the user data
        const userData = {
            firstName,
            lastName,
            age,
            email
        };

        // Make an API call to save the changes
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // Handle successful response
                console.log("Profile updated successfully!");
            } else {
                // Handle errors
                console.error("Error updating profile:", response.statusText);
            }
        } catch (error) {
            console.error("There was an error updating the profile:", error);
        }
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

    const navigate = useNavigate();

    const handleHome = () => {
        // Redirect to the main page (control panel)
        navigate('/controlpanel'); 
    };



    return (

        <div className="container mt-5">

            <div className="card profile-card">
                <div className="card-body">

                    {/* Profile Picture */}

                    {/*<div className="d-flex flex-column align-items-center">*
                        <img src="logo.jpg" alt="Profile" className="profile-pic" />
                        <input type="text" className="form-control mb-2 username-input" placeholder="UserName" />
                        <button className="btn btn-primary mt-2">Change Picture</button>
                    </div>*/}


                    {/* User Details */}
                    <div className="mt-4">
                        <div className="mt-4">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control mb-2"
                                placeholder="Age"
                                value={age}
                                onChange={e => setAge(e.target.value)}
                            />
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="E-Mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

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
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-success mt-2" onClick={handleSubmitChanges}>Submit</button>
                        <button className="btn btn-secondary" onClick={handleHome}>Home</button>

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Profile;
