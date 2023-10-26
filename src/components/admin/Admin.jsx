import React, { useState, useEffect } from "react";
import "./Admin.css";
import Navbar from "../navbar/Navbar";

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVacationRequests } from '../../redux/slices/VacationRequestSlice';
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

            setDeclineComment(prevState => {
                return { ...prevState, [id]: '' };
            });

            const declineMessage = "Request declined successfully";

            setMessage(declineMessage);
            console.log(declineComment);

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
                        {vacationRequests.filter(request => request.status === "Pending").map(request => (
                            <div key={request.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{request.name}</h5>
                                    <p> Request ID: {request.id}</p>
                                    <p> Status: <span className={statusColor(request.status)}>{request.status}</span></p>
                                    <p style={{ color: "blue" }}>
                                        {new Date(request.startDate).toLocaleDateString()}
                                        {new Date(request.endDate).toLocaleDateString()}
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
