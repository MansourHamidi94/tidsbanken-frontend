import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"; 

const SignUp = () => {
    // State variables to store user input for email, password, and username.
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    // Function to handle the sign-up button click event.
    const handleSignUp = () => {
        alert("Sign Up successful");
        // to create a new user account or send registration data to a server.
        // This function is a placeholder for handling the sign-up process.
    }

    return (
        <div className="row g-0 wh-100 justify-content-center align-items-center signup-container">
            {/* Container for the sign-up form */}
            <div className="col-10 d-flex justify-content-center align-items-center border rounded-2 bg-white">
                {/* Column for the logo (visible only on medium and larger screens) */}
                <div className="d-none d-md-block col-5 justify-content-center">
                    <img src="logo.jpg" alt="" className='img-fluid' />
                </div>
                {/* Column for the sign-up form inputs */}
                <form className="col-12 col-md-6 py-4 px-3">
                    {/* Sign-up title */}
                    <h4 className="signup-title text-center py-2 mb-4">Sign Up</h4>
                    {/* Username input */}
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder='johndoe'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    {/* Email input */}
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder='johndoe@hotmail.com'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    {/* Password input */}
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    {/* Sign-up button */}
                    <div className="text-center">
                        <button className="signup-btn py-3 rounded-3" onClick={() => { handleSignUp() }}>
                            Sign Up
                        </button>
                    </div>
                    {/* Link to login page */}
                    <div className="text-center mt-4">
                        Already Registered? <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignUp;
