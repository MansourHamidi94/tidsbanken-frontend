import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";  // Tilføj denne linje øverst
import "./Calendar.css";
import VacationPlanner from "../vacation/VacationPlanner.jsx";


function Calendar() {

    //Date - useState()
    const [date, setDate] = useState(new Date());
    const year = date.getFullYear(); // Get year
    const month = date.getMonth(); // Get Month

    //InEligblePeriods
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showVacationPlanner, setShowVacationPlanner] = useState(false);
    const [instruction, setInstruction] = useState("");  // can be "start" or "end"

    // (Currentyear -1) = previous year
    const handlePreviousYear = () => {
        setDate(new Date(year - 1, month)); //Use useState() to Update "setDate"
    };

    // (Currentyear + 1) = Next year
    const handleNextYear = () => {
        setDate(new Date(year + 1, month));
    };

    // (Current month - 1) = previous month
    const handlePreviousMonth = () => {
        setDate(new Date(year, month - 1));
    };

    // (Current month + 1) = next month
    const handleNextMonth = () => {
        setDate(new Date(year, month + 1));
    };

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

    //Display ineligbleperiods
    const redPeriods = [];
    if (startDate && endDate) {
        for (let i = startDate.getDate(); i < endDate.getDate() + 1; i++) {
            redPeriods.push(i);
        }
    }

    // Modified handleDateClick to capture dates based on the instruction
    const handleDateClick = (dayOfMonth) => {
        if (instruction === "start") {
            setStartDate(new Date(year, month, dayOfMonth));
            setInstruction("end");
        } else if (instruction === "end") {
            setEndDate(new Date(year, month, dayOfMonth));
            setInstruction("");
            setShowVacationPlanner(false);  // close vacation planner once end date is selected
        }
    };

    // Start the vacation planning process
    const startVacationPlanning = () => {
        setShowVacationPlanner(true);
        setInstruction("start");
    };


    console.log(redPeriods + " days");

    return (
        <div className="body-container">
        <Navbar />
        <div className="calendar mx-auto mt-0 d-flex justify-content-center align-items-center ">
            <div>
                <div className="d-flex justify-content-center mb-3">
                    <button onClick={handlePreviousYear} className="btn btn-secondary btn-sm"> {(year - 1)}</button>
                    <h2 className="mx-3">{year}</h2>
                    <button onClick={handleNextYear} className="btn btn-secondary btn-sm"> {(year + 1)}</button>
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <div className="d-flex justify-content-center mb-3">
                        <button onClick={handlePreviousMonth} className="btn custom-button btn-secondary btn-sm">{new Date(year, month - 1).toLocaleString("default", { month: "long" })}</button>
                        <h1 className="mx-3">{currentMonthName}</h1>
                        <button onClick={handleNextMonth} className="btn custom-button btn-secondary btn-sm">{new Date(year, month + 1).toLocaleString("default", { month: "long" })}</button>
                    </div>
                </div>
                
                <VacationPlanner
                    startDate={startDate}
                    endDate={endDate}
                    showVacationPlanner={showVacationPlanner}
                    setShowVacationPlanner={setShowVacationPlanner}
                    instruction={instruction}
                    startVacationPlanning={startVacationPlanning}
                />

                <table className="table">
                    <thead>
                        <tr>
                            <th>Man</th>
                            <th>Tir</th>
                            <th>Ons</th>
                            <th>Tor</th>
                            <th>Fre</th>
                            <th>Lør</th>
                            <th>Søn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {[...Array(7)].map((_, dayIndex) => {
                                    const dayOfMonth = weekIndex * 7 + dayIndex + 1 - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1);
                                    const isRedPeriod = redPeriods.includes(dayOfMonth);

                                    if (dayOfMonth > 0 && dayOfMonth <= daysInMonth.length) {
                                        return (
                                            <td key={dayIndex}>
                                                <div className={`custom-card p-2 mb-2 d-flex 
                                                align-items-center justify-content-center ${isRedPeriod ? "red-period" : ""}`}>
                                                    <a href="#" className="card-title h4 font-weight-bold" onClick={() => handleDateClick(dayOfMonth)}>
                                                        {dayOfMonth + "."} {monthShorted}
                                                    </a>
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
