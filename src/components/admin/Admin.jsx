import React, { useState, useEffect } from "react";
import "./Admin.css";
import Navbar from "../navbar/Navbar";

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVacationRequests, updateVacationRequest } from '../../redux/slices/VacationRequestSlice';
import { fetchAllUsers, addUser, deleteUser } from '../../redux/slices/userSlice';
import { fetchCommentsByRequestId, selectCommentsByRequestId, addCommentToApi } from "../../redux/slices/commentsSlice";



/*
note for me
- tilføj commentar push commentar til ID
- accept or decline - ændre status til approved eller Rejected.
*/

function Admin() {
    // Redux - dispatch actions
    const dispatch = useDispatch();

    // Use useSelector to fetch data from Redux store
    const vacationRequests = useSelector((state) => state.vacationRequest.vacationRequests);
    const users = useSelector((state) => state.user.users);

    // Get the last 5 pending vacation requests
    const lastFivePendingRequests = vacationRequests
        .filter(request => request.status === "Pending")
        .slice(-5);

    // Get the last 5 vacation requests regardless of their status
    const lastFiveVacationRequests = vacationRequests.slice(-5);

    const [declineComment, setDeclineComment] = useState({});

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(fetchAllVacationRequests()); // Fetch all requests
        dispatch(fetchAllUsers()); // Fetch users
    }, [dispatch]);

    const handleAccept = async (id) => {
        try {
            setLoading(true);
            
            // Update the status to "Approved" via the API
            const updatedData = {
                status: "Approved"
            };
            
            await dispatch(updateVacationRequest({ requestId: id, updatedData }));
    
            setMessage("Request accepted successfully");
        } catch (error) {
            console.error("Error accepting request", error);
            setMessage("Error accepting request");
        } finally {
            setLoading(false);
        }
    };
    

    const handleDecline = async (id) => {
        try {
            setLoading(true);
    
            const userComment = declineComment[id]; // Fetching the comment for the specific request id
    
            if (!userComment) { // Checking if the comment is not empty
                setMessage("Please provide a comment before declining.");
                return; // Exit the function if no comment is provided
            }
    
            // Setting the message for the decline, you can adjust this if needed
            const declineMessage = userComment;
    
            setMessage(declineMessage);
            console.log(declineMessage);
    
            // Posting the decline comment to the API
            const comment = {
                message: declineMessage,
                dateCommented: new Date().toISOString() // Setting the current date-time in ISO format
            };
            dispatch(addCommentToApi({ requestId: id, comment: comment }));
    
            // Clearing the textarea after successfully sending the comment
            setDeclineComment(prevState => {
                const newState = { ...prevState };
                delete newState[id];
                return newState;
            });
    
        } catch (error) {
            console.error("Error declining request", error);
            setMessage("Error declining request");
        } finally {
            setLoading(false);
        }
    };
    


    const statusColor = (status) => {
        switch (status) {
            case "Approved":
                return "status-approved";
            case "Pending":
                return "status-pending";
            case "Declined":
                return "status-declined";
            default:
                return "black"; // Default color for unknown status
        }
    }

    return (
        <div className="container-for-site">
            <Navbar />

            <h2 className="text-center mb-4">Admin Panel</h2>
            {loading && <div className="loading">Loading...</div>}
            {message && <p>{message}</p>}
            <div className="row justify-content-center mb-5">


                <div className="col-md-6">
                    <h2>Vacation Requests</h2>
                    <div className="card-container">
                        {lastFivePendingRequests.map(request =>  (
                            <div key={request.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{request.name}</h5>
                                    <p> Request ID: {request.id}</p>
                                    <p> Status: <span className={statusColor(request.status)}>{request.status}</span></p>
                                    <p style={{ color: "blue" }}>
                                    From {new Date(request.startDate).toLocaleDateString()} - <br></br>
                                       To {new Date(request.endDate).toLocaleDateString()}
                                    </p>

                                    <CommentsList requestId={request.id} />

                                    <textarea
                                        className="form-control mb-2"
                                        placeholder="Skriv din kommentar her..."
                                        value={declineComment[request.id] || ""}
                                        onChange={(e) => setDeclineComment({ ...declineComment, [request.id]: e.target.value })}
                                    />
                                </div>
                                <div className="card-footer">
                                    <button className="custom-button" id="accept" onClick={() => handleAccept(request.id)}>Accepter</button>
                                    <button className="custom-button" id="decline" onClick={() => handleDecline(request.id)}>Afvist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-6">
                    <h2>Vacation Requests History</h2>
                    <div className="card-container">
                        {vacationRequests.slice().map(request => (
                            <div key={request.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{request.name}</h5>
                                    <p> Request ID: {request.id}</p>
                                    <p> Status: <span className={statusColor(request.status)}>{request.status}</span></p>
                                    <p style={{ color: "blue" }}>
                                       From {new Date(request.startDate).toLocaleDateString()} - <br></br>
                                       To {new Date(request.endDate).toLocaleDateString()}
                                    </p>

                                    <CommentsList requestId={request.id} />

                                    <textarea
                                        className="form-control mb-2"
                                        placeholder="Skriv din kommentar her..."
                                        value={declineComment[request.id] || ""}
                                        onChange={(e) => setDeclineComment({ ...declineComment, [request.id]: e.target.value })}
                                    />
                                </div>
                                <div className="card-footer">
                                    <button className="custom-button" id="accept" onClick={() => handleAccept(request.id)}>Accepter</button>
                                    <button className="custom-button" id="decline" onClick={() => handleDecline(request.id)}>Afvist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

//Comment functions
const CommentsList = ({ requestId }) => {
    const dispatch = useDispatch();
    const commentsForThisRequest = useSelector(state => selectCommentsByRequestId(state, requestId)) || [];

    useEffect(() => {
        dispatch(fetchCommentsByRequestId(requestId));
    }, [dispatch, requestId]);

    return (
        <div className="card-text">
            <strong>Comments:</strong>
            <ul>
                {commentsForThisRequest.length > 0 ? (
                    commentsForThisRequest.map((comment) => (
                        <li key={comment.id}>
                            <p><strong>{comment.userName}:</strong> {comment.message}</p>
                        </li>
                    ))
                ) : (
                    <li>No comments..</li>
                )}
            </ul>
        </div>
    );
}

export default Admin;
