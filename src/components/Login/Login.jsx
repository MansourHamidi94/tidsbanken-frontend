import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


const Login = () => {
    //Navigate with react router dom
    const navigate = useNavigate();

    // State variables to store user input for email and password.
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    //login admin quickie
    const quickMail = "experis@manpower.com";
    const quickPassword = "experis123";

    //login user quickie
    const quickUserMail = "user@manpower.com";
    const quickUserPassword = "user123";

    // Function to handle the login button click event.
    const handleLogin = () => {


        // This function is a placeholder for handling the login process.
        if (email === quickMail && password === quickPassword) {
            localStorage.setItem('userType', 'Admin');
            alert("Login successful as Admin");
            navigate('/ControlPanel');  // Navigate to /ControlPanel after successful login.

        }
        if (email === quickUserMail && password === quickUserPassword) {
            localStorage.setItem('userType', 'User');
            alert("Login successful as User");
            navigate('/ControlPanel');  // Navigate to /ControlPanel after successful login.

        } 

    };

    return (

        <div className="wh-100 justify-content-center align-items-center login-container">
            {/* Column for the login form */}
            <div className="col-10 d-flex justify-content-center align-items-center border rounded-2 bg-white login-form-container">
                {/* Column for the logo */}
                <div className="col-5 justify-content-center">
                    <img src="logo4.png" alt="" className='img-fluid' />
                </div>
                {/* Column for the login form inputs */}
                <form className="col-6 py-4 px-3">
                    {/* Login title */}
                    <h4 className="login-title text-center py-2 mb-4">Welcome!</h4>
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
                    <div className="signin-title text-center mt-4">
                        Not Registered? <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>



    )
};

export default Login;