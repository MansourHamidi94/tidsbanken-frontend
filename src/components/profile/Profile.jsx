// Profile Component
// This component provides user profile functionalities including updating user details and changing password.
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Necessary imports for Redux
import { getUserById} from '../../redux/slices/userSlice'; // Assuming you have a userSlice.js in the same directory
import Navbar from "../navbar/Navbar.jsx";
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
        <div>
                <Navbar/>

        <div className="profile-container">
        <div className="card profile-card">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    
                </div>

                <div className="mt-4">
    <div className="form-control mb-2">
        <span className="label-display">First Name:</span> {userProfile?.firstName}
    </div>
    <div className="form-control mb-2">
        <span className="label-display">Last Name:</span> {userProfile?.lastName}
    </div>
    <div className="form-control mb-2">
        <span className="label-display">E-Mail:</span> {userProfile?.email}
    </div>
                   

                </div>
    
                   
                    <div className="d-flex justify-content-between mt-3">

                    </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default Profile;