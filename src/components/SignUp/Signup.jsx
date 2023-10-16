import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/userSlice"; 
import "./Signup.css"; 

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userError = useSelector(state => state.user.error);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await dispatch(signupUser(formData)).unwrap();
            alert('Sign Up successful');
            navigate('/login');
        } catch (error) {
            alert('Sign Up failed');
        }
    };

    const inputFields = [
        {name: 'firstName', type: 'text'},
        {name: 'lastName', type: 'text'},
        {name: 'username', type: 'text'},
        {name: 'email', type: 'email'},
        {name: 'password', type: 'password'}
    ];

    return (
        <div className="row g-0 wh-100 justify-content-center align-items-center signup-container">
            <div className="col-10 d-flex justify-content-center align-items-center border rounded-2 bg-white">
                <div className="d-none d-md-block col-5 justify-content-center">
                    <img src="logo.jpg" alt="" className='img-fluid' />
                </div>
                <form className="col-12 col-md-6 py-4 px-3" onSubmit={handleSignUp}>
                    <h4 className="signup-title text-center py-2 mb-4">Sign Up</h4>
                    {inputFields.map(field => (
                        <div className="form-floating mb-3" key={field.name}>
                            <input
                                type={field.type}
                                className="form-control"
                                id={field.name}
                                name={field.name}
                                placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                            <label htmlFor={field.name}>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
                        </div>
                    ))}
                    <div className="text-center">
                        <button type="submit" className="signup-btn py-3 rounded-3">
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        Already Registered? <Link to="/login">Login</Link>
                    </div>
                    {userError && <p className="text-danger text-center mt-2">{userError}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;
