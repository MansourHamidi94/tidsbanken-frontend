// Profile Component
// This component provides user profile functionalities including updating user details and changing password.
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Necessary imports for Redux
import { getUserById} from '../../redux/slices/userSlice'; // Assuming you have a userSlice.js in the same directory

import './Profile.css';

// Component Function

function Profile() {
    // States
    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [theme, setTheme] = useState('light'); // default to light mode
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user.profile);

   

    useEffect(() => {
        if (!userProfile) {
            dispatch(getUserById()); 
        }
    }, [dispatch, userProfile]);

    

    // Event Handlers
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

  


    // Function to toggle theme between light and dark
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

    // Navigation handler
    const navigate = useNavigate();

    const handleHome = () => {
        // Redirect to the main page (control panel)
        navigate('/controlpanel');
    };
    // Editing in Profile Section
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
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
                        <div className="form-control mb-2 label-display">
                            First Name: {userProfile?.firstName}
                        </div>
                        <div className="form-control mb-2 label-display">
                            Last Name: {userProfile?.lastName}
                        </div>
                        <div className="form-control mb-2 label-display">
                            E-Mail: {userProfile?.email}
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
                            <button className="btn btn-success mt-2" onClick={() => {}}>Submit</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-secondary" onClick={handleHome}>Home</button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;