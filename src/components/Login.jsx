import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'; // Bootstrap components
import './Login.css'; // Importing the CSS for styling

const Login = () => {
            return (
                <section className="vh-100">
                    <div className="container py-5 h-100">
                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-md-8 col-lg-7 col-xl-6">
                                <img src="tidsbanken.jpg"
                                    className="img-fluid" alt="Phone image" />
                            </div>
                            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                                <form>
                                    {/* Email input */}
                                    <div className="form-outline mb-4">
                                        <input type="email" id="form1Example13" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form1Example13">Username</label>
                                    </div>
        
                                    {/* Password input */}
                                    <div className="form-outline mb-4">
                                        <input type="password" id="form1Example23" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form1Example23">Password</label>
                                    </div>
        
                                    <div className="d-flex justify-content-around align-items-center mb-4">
                                        {/* Checkbox */}
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="form1Example3" defaultChecked />
                                            <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                        </div>
                                        <a href="#!">Forgot password?</a>
                                    </div>
        
                                    {/* Submit button */}
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
        
                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                    </div>
        
                                    <a className="btn btn-primary btn-lg btn-block" style={{backgroundColor: "#3b5998"}} href="#!" role="button">
                                        <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                                    </a>
                                    <a className="btn btn-primary btn-lg btn-block" style={{backgroundColor: "#55acee"}} href="#!" role="button">
                                        <i className="fab fa-twitter me-2"></i>Continue with Twitter
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        

export default Login;
