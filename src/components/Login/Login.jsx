import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import the Login component's CSS styling.

const Login = () => {
    // State variables to store user input for email and password.
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // Function to handle the login button click event.
    const handleLogin = () => {
        alert("Login successful");
        // In a real application, you would typically use email and password for user authentication.
        // This function is a placeholder for handling the login process.
    };

    return (
        <div>

        <div className = "row g-0 wh-100 justify-content-center align-items-center login-container"> 
        {/* Container for the login form */ }
            
                {/* Column for the login form */}
                <div className="col-10 d-flex justify-content-center align-items-center border rounded-2 bg-white">
                    {/* Column for the logo */}
                    <div className="col-5 justify-content-center">
                        <img src="logo.jpg" alt="" className='img-fluid' />
                    </div>
                    {/* Column for the login form inputs */}
                    <form className="col-6 py-4 px-3">
                        {/* Login title */}
                        <h4 className="login-title text-center py-2 mb-4">Login</h4>
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
                            <label htmlFor="email">Password</label>
                        </div>
                        {/* Login button */}
                        <div className="text-center">
                            <button className="login-btn py-3 rounded-3" onClick={() => { handleLogin() }}>
                                Login
                            </button>
                        </div>
                        {/* Sign up link */}
                        <div className="text-center mt-4">
                            Not Registered? <Link to="/signup">Sign Up</Link>
                        </div>
                    </form>
                </div>
            
        </div >
                                </div>
    )
};

export default Login;
