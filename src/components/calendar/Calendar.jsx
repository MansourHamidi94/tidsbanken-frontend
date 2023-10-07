import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Calendar() {

    const [date, setDate] = useState(new Date().getFullYear());
    const year = date.getFullYear();
    const month = date.getMonth();

    const handlePreviousYear = () => {
        setDate(new Date(year - 1, month));
    };

    const handleNextYear = () => {
        setDate(new Date(year + 1, month));
    };

    const handlePreviousMonth = () => {
        setDate(new Date(year, month - 1));
    };

    const handleNextMonth = () => {
        setDate(new Date(year, month + 1));
    };

    //Dates
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const currentMonthName = date.toLocaleString("default", { month: "long" });
    const monthShorted = currentMonthName.charAt(0).toUpperCase() + currentMonthName.substring(1, 3);


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

            <div className="calendar mx-auto mt-0 d-flex justify-content-center align-items-center styl">
                <div > {/* Dette ekstra div vil indeholde kalenderindholdet */}

                    <div>
                        {/* Year navigation */}
                        <div className="d-flex align-items-center mb-3">
                        <button onClick={handlePreviousYear} className="btn btn-primary btn-sm"> {(year - 1)}</button>
                        <h2 className="mx-3">{year}</h2>
                        <button onClick={handleNextYear} className="btn btn-primary btn-sm"> {(year + 1)}</button>
                    </div>

                        {/* Rest of your calendar */}
                        {/* ... */}
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <button onClick={handlePreviousMonth} className="btn btn-secondary btn-sm">{new Date(year, month - 1).toLocaleString("default", { month: "long" })}</button>
                        <h3 className="mx-3">{currentMonthName}</h3>
                        <button onClick={handleNextMonth} className="btn btn-secondary btn-sm">{new Date(year, month + 1).toLocaleString("default", { month: "long" })}</button>
                    </div>


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
                            {[...Array(5)].map((_, weekIndex) => (
                                <tr key={weekIndex}>
                                    {[...Array(7)].map((_, dayIndex) => {
                                        const dayOfMonth = weekIndex * 7 + dayIndex + 1 - firstDay.getDay();

                                        if (dayOfMonth > 0 && dayOfMonth <= daysInMonth.length) {
                                            return (
                                                <td key={dayIndex}>
                                                    <div
                                                        className="card p-2 mb-2 bg-primary text-white d-flex align-items-center justify-content-center"
                                                        style={{ width: '100px', height: '100px' }}
                                                    >
                                                        <a href="#" className="card-title h4 font-weight-bold text-decoration-none">{dayOfMonth + "."} {monthShorted}</a>
                                                    </div>
                                                </td>
                                            );
                                        } else {
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
