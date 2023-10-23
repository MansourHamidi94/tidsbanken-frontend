import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import "./Calendar.css";
import VacationPlanner from "../vacation/VacationPlanner.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { createVacationRequest, setStartDate, setEndDate } from '../../redux/slices/VacationRequestSlice';
import { fetchIneligiblePeriods } from '../../redux/slices/IneligiblePeriodsSlice';

function Calendar() {
    const [date, setDate] = useState(new Date());
    const year = date.getFullYear();
    const month = date.getMonth();

    const dispatch = useDispatch();
    const reduxStartDate = useSelector(state => new Date(state.vacationRequest?.startDate));
    const reduxEndDate = useSelector(state => new Date(state.vacationRequest?.endDate));
    const ineligiblePeriods =  useSelector((state) => state.ineligiblePeriods?.periods || []);



    useEffect(() => {
        dispatch(fetchIneligiblePeriods());
    }, [dispatch]);

    const isDateWithinPeriod = (date, start, end) => {
        return date >= new Date(start) && date <= new Date(end);
    };

    const isDateIneligible = (date) => {
        for (const period of ineligiblePeriods) {
            if (isDateWithinPeriod(date, period.startDate, period.endDate)) {
                return true;
            }
        }
        return false;
    };

    const [showVacationPlanner, setShowVacationPlanner] = useState(false);
    const [instruction, setInstruction] = useState("");  

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

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const currentMonthName = date.toLocaleString("default", { month: "long" });
    const monthShorted = currentMonthName.charAt(0).toUpperCase() + currentMonthName.substring(1, 3);

    const daysInMonth = [];
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        daysInMonth.push(i);
    }

    const handleDateClick = (dayOfMonth) => {
        const selectedDate = new Date(year, month, dayOfMonth);
        if (isDateIneligible(selectedDate)) {
            return;
        }
        if (instruction === 'start') {
            dispatch(setStartDate(selectedDate.toISOString()));
            setInstruction('end');
        } else if (instruction === 'end') {
            dispatch(setEndDate(selectedDate.toISOString()));
            setInstruction('');
            dispatch(createVacationRequest({
                vacationType: "vacation",
                startDate: reduxStartDate,
                endDate: selectedDate,
                userId: 1,
                requestDate: new Date().toISOString()  
            }));
            setShowVacationPlanner(false);
        }
    };

    const startVacationPlanning = () => {
        setShowVacationPlanner(true);
        setInstruction("start");
    };

    return (
        <div className="">
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
                                        const currentDate = new Date(year, month, dayOfMonth);
                                        const isRedPeriod = isDateIneligible(currentDate);
                                        if (dayOfMonth > 0 && dayOfMonth <= daysInMonth.length) {
                                            return (
                                                <td key={dayIndex}>
                                                    <div className={`custom-card p-2 mb-2 d-flex align-items-center justify-content-center ${isRedPeriod ? "red-period" : ""}`}>
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
