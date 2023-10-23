import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./VacationPlanner.css";
import Popup from "../popup/popup";
import Draggable from 'react-draggable';

// Vacation planner
/*
1. Create request
2. pick start date
3. Pick end date
4. Display the vacant period in calendar
*/
function VacationPlanner({ startDate, endDate, showVacationPlanner, setShowVacationPlanner, instruction, startVacationPlanning }) {

    const [selectedReason, setSelectedReason] = React.useState(null);
    const [popupMessage, setPopupMessage] = useState("");

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
                                onClick={() => setPopupMessage(`Vacation SE sent with start date: ${startDate.toLocaleDateString()} and end date: ${endDate.toLocaleDateString()}`)}
                                id="send-button"> Send request</button>
                        </>
                    )}
                </div>
            </Draggable>
            </>
            );
}

            export default VacationPlanner;
