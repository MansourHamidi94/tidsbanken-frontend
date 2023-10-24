import React, { useState, useEffect } from "react";
import "./Admin.css";
import Navbar from "../navbar/Navbar";

//Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVacationRequests } from '../../redux/slices/VacationRequestSlice';
import { fetchAllUsers, addUser, deleteUser } from '../../redux/slices/userSlice';


function Admin() {

    //Redux - dispatch actions
    //Redux - dispatch actions
    const dispatch = useDispatch();

    // Brug useSelector for at hente data fra Redux store
    const vacationRequests = useSelector((state) => state.vacationRequest.vacationRequests);
    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(fetchAllVacationRequests()); // Henter alle requests
        dispatch(fetchAllVacationRequests('pending')); // Henter kun "pending" requests
        dispatch(fetchAllUsers()); // Fetch users
    }, [dispatch]);

    //Manage vacation Request
    const [requests, setRequests] = useState([
    ]);


    //State to manage the name of the 
    const [newUserName, setNewUserName] = useState("");
    const [declineComment, setDeclineComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
 
     // Function for handling vacation request acceptance
     const handleAccept = async (id) => {
         try {
             setLoading(true);
             // API call to update the request should go here
             setMessage("Request accepted successfully");
         } catch (error) {
             console.error("Error accepting request", error);
             setMessage("Error accepting request");
         } finally {
             setLoading(false);
         }
     };
 
     // Function for handling vacation request decline
     const handleDecline = async (id) => {
         try {
             setLoading(true);
             // API call to update the request should go here
             setMessage("Request declined successfully");
             setDeclineComment("");
         } catch (error) {
             console.error("Error declining request", error);
             setMessage("Error declining request");
         } finally {
             setLoading(false);
         }
     };
 
     // Function to add a new user
     const handleAddUser = async () => {
         if (!newUserName.trim()) {
             return setMessage("User name is required");
         }
         try {
             setLoading(true);
             dispatch(addUser({ id: Date.now(), name: newUserName, rolename: "New Role" }));
             setMessage("User added successfully");
             setNewUserName("");
         } catch (error) {
             console.error("Error adding user", error);
             setMessage("Error adding user");
         } finally {
             setLoading(false);
         }
     };
 
     // Function for handling user deletion
     const handleDeleteUser = async (id) => {
         const confirmation = window.confirm("Are you sure you want to delete this user?");
         if (confirmation) {
             try {
                 setLoading(true);
                 dispatch(deleteUser(id));
                 setMessage("User deleted successfully");
             } catch (error) {
                 console.error("Error deleting user", error);
                 setMessage("Error deleting user");
             } finally {
                 setLoading(false);
             }
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
                        {(vacationRequests.filter(request => request.status === "Pending")).map(request => (
                            <div key={request.id} className="card">
                                <div className="card-body">

                                    <h5 className="card-title">{request.name}</h5>
                                    <p> Request ID: {request.id}</p>
                                    <p> Status: {request.status}</p>
                                    <p >From {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()} </p>
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
                                    <p> Request ID: {request.id}</p>
                                    <p> Status: {request.status}</p>
                                    <p >From {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()} </p>
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
                                <h3> User: {user.username}</h3>
                                <p> Request ID: {user.id}</p>
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
