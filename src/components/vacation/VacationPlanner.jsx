import React from "react";
import { Link } from "react-router-dom";
import "./VacationPlanner.css";
import Popup from "../popup/popup";

// Vacation planner
/*
1. Create request
2. pick start date
3. Pick end date
4. Display the vacant period in calendar
*/
function VacationPlanner({ startDate, endDate, showVacationPlanner, setShowVacationPlanner, instruction, startVacationPlanning }) {
    return (
        <div>
            <button className="vacation-btn" onClick={startVacationPlanning}> 📅Vacation Request</button> 
            {showVacationPlanner && (
                <Popup 
                    onClose={() => setShowVacationPlanner(false)}
                    title="Vacation Planner"
                    content={ instruction === "start" ? "Pick a start date" : "Pick an end date"}
                />
            )}
            {startDate && <div className="date-display">Start Date: {startDate.toLocaleDateString()}</div>}
            {endDate && <div className="date-display">End Date: {endDate.toLocaleDateString()}</div>}
        </div>
    );
}



export default VacationPlanner;
