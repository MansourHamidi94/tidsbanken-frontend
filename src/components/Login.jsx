import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'; // Bootstrap components
import './Login.css'; // Importing the CSS for styling

const Login = () => {
    return (
        <div className="login-container">
            <img src="/path-to-your-logo.png" alt="Logo" className="logo" /> {/* Logo */}
            <Form className="login-form">
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter your username" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your password" />
                </FormGroup>
                <Button color="primary">Login</Button>
                <div className="signup-link">
                    Don't have a password? <a href="/signup">Sign Up</a>
                </div>
            </Form>
        </div>
    );
}

export default Login;
