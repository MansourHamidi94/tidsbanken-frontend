import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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
            <div>
                <h1>Tidsbanken</h1>
            </div>

            <div className="row mb-5">
                <div className="col-md-6">

                    {/* Calendar Card */}
                    <Link to="/calendar" className="card bg-primary text-white text-center mb-2">
                        <div className="card-body">
                            <h5 className="card-title">Calendar</h5>
                        </div>
                    </Link>

                    {/* Vacation Request Card */}
                    <Link to="/vacation-request" className="card bg-primary text-white text-center mt-2">
                        <div className="card-body">
                            <h5 className="card-title">Vacation Request</h5>
                        </div>
                    </Link>
                </div>

                <div className="col-md-6">
                    {/* Profile Card */}
                    <Link to="/profile" className="card bg-primary text-white text-center mb-2">
                        <div className="card-body">
                            <h5 className="card-title">Profile</h5>
                        </div>
                    </Link>

                    {/* Logout Card */}
                    <Link to="/logout" className="card bg-danger text-white text-center mt-2">
                        <div className="card-body">
                            <h5 className="card-title">Logout</h5>
                        </div>
                    </Link>
                </div>
            </div>



        </div>
    );
}

export default ControlPanel;
