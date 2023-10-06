import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Calendar() {

    //Dates
    const today = new Date().getDate();

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Get month - then shorten for the first 3 characters
    const currentMonth = date.toLocaleString("default", {month: "long"})
    const monthShorted = currentMonth.substring(0,3);

    const daysInMonth = [];
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        daysInMonth.push(i);
    }

    return (

        <div className="d-flex">
            <div className="sidebar">

                <ul className="nav nav-pills justify-content-center flex-column">
                    <h1>Tidsbanken</h1>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Kalendar</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profil</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Indstillinger</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Log ud</a>
                    </li>
                </ul>
            </div>

            <div className="calendar mx-auto d-flex justify-content-center align-items-center styl">
                <div className=""> {/* Dette ekstra div vil indeholde kalenderindholdet */}
                    <h2>{`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</h2>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Søn</th>
                                <th>Man</th>
                                <th>Tir</th>
                                <th>Ons</th>
                                <th>Tor</th>
                                <th>Fre</th>
                                <th>Lør</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loop through each week (up to 5 weeks since a month might span across 5 weeks on a calendar) */}
                            {[...Array(5)].map((_, weekIndex) => (
                                <tr key={weekIndex}> {/* Start a new row for each week */}

                                    {/* Loop through each day of the week (from Sunday to Saturday) */}
                                    {[...Array(7)].map((_, dayIndex) => {

                                        // Calculate the day of the month for the current cell. Adjust based on which day of the week the month starts on.
                                        const dayOfMonth = weekIndex * 7 + dayIndex + 1 - firstDay.getDay();

                                        // Check if the calculated day is part of the current month
                                        if (dayOfMonth > 0 && dayOfMonth <= daysInMonth.length) {
                                            return (
                                                <td key={dayIndex}>
                                                    {/* Display the day inside a styled Bootstrap card */}
                                                    <div className="card p-3 mb-2 bg-primary text-white">
                                                        <div className="card-body">
                                                            <a href="#" className="card-title">{dayOfMonth} {monthShorted}</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        } else {
                                            // If the day isn't part of the current month, render an empty cell
                                            return <td key={dayIndex}></td>;
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>


        </div>


    );
}

export default Calendar;
