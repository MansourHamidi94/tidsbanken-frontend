import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./ControlPanel.css";
import Navbar from "../navbar/Navbar.jsx";  // Tilføj denne linje øverst

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
        <div>
            <Navbar/>

            <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4">Tidsbanken</h1>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-md-5 mb-3">
                    <Link to="/calendar" className="card custom-card bg-light shadow-lg mb-3">
                        <div className="card-body">
                            <h5 className="card-title ">Calendar</h5>
                        </div>
                    </Link>
                    <Link to="/vacation-request" className="card custom-card bg-light shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title " >Vacation Request</h5>
                        </div>
                    </Link>
                </div>

                <div className="col-md-5 mb-3">
                    <Link to="/profile" className="card custom-card bg-light shadow-lg mb-3">
                        <div className="card-body">
                            <h5 className="card-title ">Profile</h5>
                        </div>
                    </Link>
                    <Link to="/logout" id="logout" className="card custom-card bg-light shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title text-danger">Logout</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </div>



        </div>
    );
}

export default ControlPanel;
