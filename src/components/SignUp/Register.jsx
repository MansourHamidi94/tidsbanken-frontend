import React, { useState } from "react";
import "/Users/mansourhamidi/Documents/Experis/tidsbanken-frontend/src/components/Login/Login.jsx"
import { Link } from "react-router-dom";
const SignUp = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const handlesignup = () => {
        alert("Sign Up succesfull")
    }


    return (
        <div className="container-fluid wrapper">

            <div className="row g-0 wh-100 justify-content-center align-items-center signup-container">
                <div className="col-10 d-flex justify-content-center align-items-center border rounded-2 bg-white">
                    <div className="d-none d-md-block col-5 justify-content-center">

                        <img src="tidsbanken.jpg" alt="" className='img-fluid' />
                    </div>

                    <form className="col-12 col-md-6 py-4 px-3">
                        <h4 className="signup-title text-center py-2 mb-4">Sign Up</h4>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username" placeholder='johndoe' onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" placeholder='johndoe@hotmail.com' onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="email">Password</label>
                        </div>
                        <div className="text-center">
                            <button className="signup-btn py-3 rounded-3" onClick={() => { handlesignup() }}>

                                Sign Up
                            </button>

                        </div>
                        <div className="text-center mt-4">
                            Already Registered ? <Link to="/login">Login</Link>
                        </div>

                    </form>


                </div>

            </div>
        </div>
    )
};

export default SignUp;