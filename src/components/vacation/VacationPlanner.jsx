import React from "react";
import { Link } from "react-router-dom";
import "./VacationPlanner.css";
import Popup from "../popup/popup";
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setEndDate, createVacationRequest } from '../../redux/Slices/VacationRequestSlice';


// Vacation planner
/*
1. Create request
2. pick start date
3. Pick end date
4. Display the vacant period in calendar
*/
function VacationPlanner({
    showVacationPlanner,
    setShowVacationPlanner,
    instruction,
    setInstruction,
    startVacationPlanning}) {
    const [endDate, setEndDate] = React.useState(null);

    const dispatch = useDispatch();
    const reduxStartDate = useSelector(state => new Date(state.vacationRequest.startDate));

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleDateClick = (dayOfMonth) => {
        const selectedDate = new Date(reduxStartDate.getFullYear(), reduxStartDate.getMonth(), dayOfMonth);

        if (instruction === 'start') {
            dispatch(setStartDate(selectedDate.toISOString()));
            setInstruction('end');
        } else if (instruction === 'end') {
            dispatch(setEndDate(selectedDate.toISOString()));
            setInstruction('');

            dispatch(
                createVacationRequest({
                    startDate: reduxStartDate.toISOString(),
                    endDate: selectedDate.toISOString(),
                })
            );

            setShowVacationPlanner(false);
        }
    };

    return (
        <div>
            <button className="vacation-btn" onClick={startVacationPlanning}> 📅 Vacation Request</button>
            {showVacationPlanner && (
                <Popup
                    onClose={() => setShowVacationPlanner(false)}
                    title="Click on calendar"
                    content={instruction === "start" ? "Pick a start date and end date" : "Pick an end date"}
                />
            )}
            {reduxStartDate && <div className="date-display">Start Date: {reduxStartDate.toLocaleDateString()}</div>}
            {endDate && <div className="date-display">End Date: {endDate.toLocaleDateString()}</div>}
        </div>
    );
}



export default VacationPlanner;
