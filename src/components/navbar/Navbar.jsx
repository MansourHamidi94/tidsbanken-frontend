import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-center align-items-center navbar-inner-container">
                <Link className="navbar-brand custom-card" to="/ControlPanel">
                <img src="logo4.png" alt="" className='img-fluid' />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
