import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setEndDate, createVacationRequest } from '../../redux/slices/VacationRequestSlice';
import Popup from "../popup/popup";
import "./VacationPlanner.css";

function VacationPlanner({ 
    showVacationPlanner,
    setShowVacationPlanner,
    instruction,
    setInstruction,
    startVacationPlanning
}) {
    const reduxStartDate = useSelector(state => new Date(state.vacationRequest.startDate));
    const reduxEndDate = useSelector(state => new Date(state.vacationRequest.endDate));

    return (
        <div>
            <button className="vacation-btn" onClick={startVacationPlanning}>📅 Vacation Request</button>
            
            {showVacationPlanner && (
                <Popup
                    onClose={() => setShowVacationPlanner(false)}
                    title="Click on calendar"
                    content={instruction === "start" ? "Pick a start date" : "Pick an end date"}
                />
            )}
            
            {reduxStartDate && <div className="date-display">Start Date: {reduxStartDate.toLocaleDateString()}</div>}
            
            {reduxEndDate && <div className="date-display">End Date: {reduxEndDate.toLocaleDateString()}</div>}
        </div>
    );
}

export default VacationPlanner;