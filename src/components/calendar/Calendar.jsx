import React, { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";  // Tilføj denne linje øverst
import "./Calendar.css";
import VacationPlanner from "../vacation/VacationPlanner.jsx";



function Calendar() {

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const [selectedReason, setSelectedReason] = useState(null);
    const [popupMessage, setPopupMessage] = useState("");


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
            <div className="calendar-container">
                <div className="calendar-header">
                    {/* ... (existing header code) */}
                </div>
                
                <div className="calendar-header">
                    <DateRangePicker
                        ranges={state}
                        onChange={item => setState([item.selection])}
                    />
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <VacationPlanner
                        startDate={state[0].startDate}
                        endDate={state[0].endDate}
                        showVacationPlanner={showVacationPlanner}
                        setShowVacationPlanner={setShowVacationPlanner}
                        instruction={instruction}
                        startVacationPlanning={startVacationPlanning}
                    />
                </div>
            </div>
        </div>
    );
}

export default Calendar;
