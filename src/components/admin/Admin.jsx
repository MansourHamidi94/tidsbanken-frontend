import React, { useState, useEffect } from "react";
import "./Admin.css";
import Navbar from "../navbar/Navbar";

//Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVacationRequests } from '../../redux/slices/VacationRequestSlice';



function Admin() {

    //Redux - dispatch actions
    // Redux - dispatch actions
    const dispatch = useDispatch();

    // Brug useSelector for at hente data fra Redux store
    const vacationRequests = useSelector((state) => state.vacationRequest.vacationRequests);

    // Filtrer for at finde alle afventende ferieanmodninger
    const pendingVacationRequests = vacationRequests.filter(request => request.status === "Pending");

      // Styret state for at afgøre, hvilken liste der skal vises
  const [showPendingOnly, setShowPendingOnly] = useState(false);


    useEffect(() => {
        dispatch(fetchAllVacationRequests()); // Henter alle requests
        dispatch(fetchAllVacationRequests('pending')); // Henter kun "pending" requests
    }, [dispatch]);

    //Manage vacation Request
    const [requests, setRequests] = useState([
        { id: 1, name: "John", startDate: "2023-10-20", endDate: "2023-10-25", status: "Pending", comment: "I need a break." },
        { id: 2, name: "Jane", startDate: "2023-11-01", endDate: "2023-11-10", status: "Pending", comment: "Going on a holiday!" }
    ]);

    //Manage user information
    const [users, setUsers] = useState([
        { id: 1, name: "John", rolename: "Empo" },
        { id: 2, name: "Jane", rolename: "Designer" }
    ]);

    //State to manage the name of the 
    const [newUserName, setNewUserName] = useState("");
    const [declineComment, setDeclineComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    //Function - Admin accepting a vacation request
    const handleAccept = async (id) => {
        try {
            setLoading(true);
            // API call to update the request
            const updatedRequests = requests.map(request => {
                if (request.id === id) {
                    request.status = "Accepted";
                }
                return request;
            });
            setRequests(updatedRequests);
            setMessage("Request accepted successfully");
        } catch (error) {
            console.error("Error accepting request", error);
            setMessage("Error accepting request");
        } finally {
            setLoading(false);
        }
    };

    //Function - Admin declining a vacation request
    const handleDecline = async (id) => {
        try {
            setLoading(true);
            // API call to update the request
            const updatedRequests = requests.map(request => {
                if (request.id === id) {
                    request.status = "Declined";
                    request.comment = declineComment;
                }
                return request;
            });
            setRequests(updatedRequests);
            setMessage("Request declined successfully");
            setDeclineComment("");
        } catch (error) {
            console.error("Error declining request", error);
            setMessage("Error declining request");
        } finally {
            setLoading(false);
        }
    };


    //Function to add new user
    const handleAddUser = async () => {
        try {
            setLoading(true);
            // Make an API call to add the user
            setUsers([...users, { id: Date.now(), name: newUserName, rolename: "New Role" }]);
            setMessage("User added successfully");
            setNewUserName("");
        } catch (error) {
            console.error("Error adding user", error);
            setMessage("Error adding user");
        } finally {
            setLoading(false);
        }
    };

    //Function to handle deleting a user
    const handleDeleteUser = async (id) => {
        try {
            const confirmation = window.confirm("Are you sure you want to delete this user?");
            if (confirmation) {
                setLoading(true);
                // Here you would make an API call to delete the user
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);
                setMessage("User deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting user", error);
            setMessage("Error deleting user");
        } finally {
            setLoading(false);
        }
    };

    //Rendering the Admin component
    return (
        <div className="container-for-site">
            <Navbar />
            <h2 className="text-center mb-4">Admin Panel</h2>
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
            <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                    <h3>Vacation Requests</h3>
                    
                    <div className="card-container">
                        {vacationRequests.map(request => (
                            <div key={request.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{request.name}</h5>
                                    <p className="card-text">From {request.startDate} to {request.endDate}</p>
                                    <p className="card-text"><strong>Comment:</strong> {request.comment}</p>
                                    <textarea
                                        className="form-control mb-2"
                                        placeholder="Type your comment here..."
                                        value={declineComment}
                                        onChange={(e) => setDeclineComment(e.target.value)}
                                    />
                                </div>
                                <div className="card-footer">
                                    <button className="custom-button" id="accept" onClick={() => handleAccept(request.id)}>Accept</button>
                                    <button className="custom-button" id="decline" onClick={() => handleDecline(request.id)}>Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3>Vacation Requests History</h3>

                    <div className="card-container">
                        {vacationRequests.map(request => (
                            <div key={request.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{request.name}</h5>
                                    <p className="card-text">From {request.startDate} to {request.endDate}</p>
                                    <p className="card-text"><strong>Comment:</strong> {request.comment}</p>
                                    <textarea
                                        className="form-control mb-2"
                                        placeholder="Type your comment here..."
                                        value={declineComment}
                                        onChange={(e) => setDeclineComment(e.target.value)}
                                    />
                                </div>
                                <div className="card-footer">
                                    <button className="custom-button" id="accept" onClick={() => handleAccept(request.id)}>Accept</button>
                                    <button className="custom-button" id="decline" onClick={() => handleDecline(request.id)}>Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>


                    <h3>Users</h3>
                    <ul className="list-group">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item">
                                {user.name} - {user.rolename}
                                <button className="custom-button ml-2" id="delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter user name"
                            value={newUserName}
                            onChange={e => setNewUserName(e.target.value)}
                        />
                        <button className="custom-button ml-2" id="add-user" onClick={handleAddUser}>+ Add User</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
