import React, { useState } from "react";
import "/Users/mansourhamidi/Documents/Experis/tidsbanken-frontend/src/components/Login/Login.jsx"
const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = () => {
        alert("Login succesfull")
    }


    return (
        <div className="container-fluid wrapper">

            <div className="row g-0 wh-100 justify-content-center align-items-center login-container">
                <div className="col-10 d-flex justify-content-center align-items-center border rounded-2 bg-white">
                    <div className="col-5 justify-content-center">

                        <img src="tidsbanken.jpg" alt="" className='img-fluid' />
                    </div>

                    <form className="col-6 py-4 px-3">
                        <h4 className="login-title text-center py-2 mb-4">Login</h4>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" placeholder='johndoe@hotmail.com' onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="email">Password</label>
                        </div>
                        <div className="text-center">
                            <button className="login-btn py-3 rounded-3" onClick={() => { handleLogin() }}>

                                Login
                            </button>

                        </div>
                        <div className="text-center mt-4">
                            Not Registered ? Sign Up.
                        </div>

                    </form>


                </div>

            </div>
        </div>
    )
};

export default Login;