// Profile Component
// This component provides user profile functionalities including updating user details and changing password.
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

// Component Function

function Profile() {
    // States
    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");




    // Helper Functions
    function changePassword(currentPassword, newPassword, repeatNewPassword) {
        const apiUrl = 'https://test-api-updateprofile.free.beeceptor.com';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
                repeatNewPassword: repeatNewPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Password changed successfully") {
                    alert(data.message);
                } else {
                    alert("Error changing password. Please try again.");
                }
            })
            .catch(error => {
                console.error("There was an error changing the password:", error);
            });
    }


    const submitPasswordChange = (event) => {
        event.preventDefault();

        //const currentPassword = event.target.currentPassword.value;
        //const newPassword = event.target.newPassword.value;
        //const repeatNewPassword = event.target.repeatNewPassword.value;

        changePassword(currentPassword, newPassword, repeatNewPassword);
    }


    // Event Handlers
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to handle submission of profile changes
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

    // Navigation handler
    const navigate = useNavigate();

    const handleHome = () => {
        // Redirect to the main page (control panel)
        navigate('/controlpanel');
    };
    // Editing in Profile Section
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [isEditingAge, setIsEditingAge] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    // Render Component
    return (


        <div className="profile-container">
            <div className="card profile-card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <img src="logo4.png" alt="" className='img-fluid' />
                    </div>

                    {/* User Details */}
                    <div className="mt-4">
                        <div className="mt-4">
                            {isEditingFirstName ? (
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    onBlur={() => setIsEditingFirstName(false)}
                                />
                            ) : (
                                <div className="form-control mb-2 label-display" onClick={() => setIsEditingFirstName(true)}>
                                    First Name: {firstName}
                                </div>
                            )}

                            {isEditingLastName ? (
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    onBlur={() => setIsEditingLastName(false)}
                                />
                            ) : (
                                <div className="form-control mb-2 label-display" onClick={() => setIsEditingLastName(true)}>
                                    Last Name: {lastName}
                                </div>
                            )}

                            {isEditingAge ? (
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                    onBlur={() => setIsEditingAge(false)}
                                />
                            ) : (
                                <div className="form-control mb-2 label-display" onClick={() => setIsEditingAge(true)}>
                                    Age: {age}
                                </div>
                            )}

                            {isEditingEmail ? (
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onBlur={() => setIsEditingEmail(false)}
                                />
                            ) : (
                                <div className="form-control mb-2 label-display" onClick={() => setIsEditingEmail(true)}>
                                    E-Mail: {email}
                                </div>
                            )}
                        </div>

                        <button className="btn btn-secondary mt-2" onClick={() => {
                            setIsEditingFirstName(true);
                            setIsEditingLastName(true);
                            setIsEditingAge(true);
                            setIsEditingEmail(true);
                        }}>Edit</button>

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
                            <button className="btn btn-success mt-2" onClick={submitPasswordChange}>Submit</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-success mt-2" onClick={handleSubmitChanges}>Submit</button>
                        <button className="btn btn-secondary" onClick={handleHome}>Home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
