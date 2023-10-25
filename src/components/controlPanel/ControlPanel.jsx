import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./ControlPanel.css";
import Navbar from "../navbar/Navbar.jsx";  
import { useEffect } from "react";


function ControlPanel() {
    
    //Date - useState()
    const [date, setDate] = useState(new Date());
    const year = date.getFullYear(); // Get year
    const month = date.getMonth(); // Get Month


    //Dates
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    // Current month name - shorten month to display as cards
    const currentMonthName = date.toLocaleString("default", { month: "long" });
    const monthShorted = currentMonthName.charAt(0).toUpperCase() + currentMonthName.substring(1, 3);

    //Array to collect days in month | For loop to push amount of days in a month in this array
    const daysInMonth = [];
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        daysInMonth.push(i);
    }

    return (
        <div className="container-for-site">
            <div className="text-center mb-4">
                {/*<h1 className="display-4">Tidsbanken</h1>*/}
                <img src="logo4.png" alt="" className='img-fluid'/>
            </div>

            <div className="row justify-content-center mb-5 control-panel-container">
                <div className="col-md-3 mb-3">
                    <Link to="/Calendar" className="card control-panel-card bg-light shadow-lg mb-3 text-decoration-none">
                        <div className="control-panel-card__body text-center">
                            <h5 className="control-panel-card__title align-">Calendar</h5>
                        </div>
                    </Link>
                    <Link to="/vacation-request" className="card control-panel-card bg-light shadow-lg text-decoration-none">
                        <div className="control-panel-card__body text-center">
                            <h5 className="control-panel-card__title">Vacation Request</h5>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 mb-3">
                    <Link to="/profile" className="card control-panel-card bg-light shadow-lg mb-3 text-decoration-none">
                        <div className="control-panel-card__body text-center">
                            <h5 className="control-panel-card__title">Profile</h5>
                        </div>
                    </Link>
 
                    <Link to="/Admin" className="card control-panel-card bg-light shadow-lg mb-3 text-decoration-none">
                        <div className="control-panel-card__body text-center">
                            <h5 className="control-panel-card__title">Admin</h5>
                        </div>
                    </Link>
                    <Link to="/Login" id="logout-card" className="card control-panel-card bg-light shadow-lg text-decoration-none">
                        <div className="control-panel-card__body text-center">
                            <h5 className="control-panel-card__title text-danger">Logout</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ControlPanel;