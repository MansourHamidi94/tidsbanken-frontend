import React, { useState } from "react";
import "./VacationPlanner.css";
import { createVacationRequest, setStartDate, setEndDate } from '../../redux/slices/VacationRequestSlice';
import Popup from "../popup/popup";
import Draggable from 'react-draggable';

function VacationPlanner({ startDate, endDate,  reduxStartDate, reduxEndDate, dispatch }) {
   
    // Initialize selectedReason with an empty string
    const [selectedReason, setSelectedReason] = useState("");
    const [popupMessage, setPopupMessage] = useState("");

    
    // Updated button click handler:
    const handleSendRequest = () => {
        dispatch(createVacationRequest({
            vacationType: selectedReason || "Vacation",
            startDate: reduxStartDate,
            endDate: reduxEndDate,
            userId: 1,
            requestDate: new Date().toISOString()
        }));
        setPopupMessage(`Vacation request sent with start date: ${reduxStartDate.toLocaleDateString()} and end date: ${reduxEndDate.toLocaleDateString()}`);
    };
    

    return (
        <>
            {popupMessage && (
                <Popup
                    onClose={() => setPopupMessage("")}
                    title="Vacation Request"
                    content={popupMessage}
                />
            )}
            <Draggable>
                <div className="draggable-card">
                    <img src="logo4.png" alt="Logo" className="card-logo" />
                    {startDate && <div className="date-display">Start Date: {startDate.toLocaleDateString()}</div>}
                    {endDate && (
                        <>
                            <div className="date-display">End Date: {endDate.toLocaleDateString()}</div>
                            <div id="reason">
                                <select
                                    id="reason"
                                    onChange={e => setSelectedReason(e.target.value)}
                                    value={selectedReason}
                                >
                                    <option value="Default">Choose Reason </option>
                                    <option value="Vacation">Vacation</option>
                                    <option value="Holiday">Holiday</option>
                                    <option value="SickLeave">Sick Leave</option>
                                    <option value="Bereavement">Bereavement</option>
                                    <option value="ParentalLeave">Parental Leave</option>
                                    <option value="MilitaryLeave">Military Leave</option>
                                    <option value="CompensatoryTime">Compensatory Time</option>
                                </select>
                            </div>
                            <button className="vacation-btn"
                                onClick={() => setPopupMessage(`Vacation sent with start date: ${startDate.toLocaleDateString()} and end date: ${endDate.toLocaleDateString()}`)}
                                id="send-button"> Send request</button>
                        </>
                    )}
                </div>
            </Draggable>
            </>
            );
}
            export default VacationPlanner;






