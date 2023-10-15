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
function VacationPlanner({ //Props
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


     // This function sends the POST request to the server.
     const sendVacationRequest = () => {
        console.log("API Called!");
        const url = "https://localhost:7172/api/v1/VacationRequests";
        const requestPayload = {
            startDate: "2023-10-15T16:27:15.324Z",
            endDate: "2023-10-15T16:27:15.324Z",
            status: "Pending",
            userId: 6,
            requestDate: "2023-10-15T16:27:15.324Z",
            approverId: 0,
            approvalDate: "2023-10-15T16:27:15.324Z"
        };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
        })
        .then(response => {
            if (response.ok) { // Check status code
                return response.json();
            } else {
                throw new Error(`Request failed with status: ${response.status}`);
            }
        })
        .then(data => {
            console.log('Success: GOOD!', data);
        })
        .catch((error) => {
            console.error('Error: NOT GOOD', error);
        });
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
            <button className="vacation-btn" onClick={sendVacationRequest}>🚧Send API Vacation Request</button>
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
