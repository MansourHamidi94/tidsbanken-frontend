import React, { useState } from "react";
import "./Admin.css"
import Navbar from "../navbar/Navbar";

function Admin() {
    const [requests, setRequests] = useState([
        // Eksempel data
        { id: 1, name: "John", startDate: "2023-10-20", endDate: "2023-10-25", status: "Pending", comment: "" },
        { id: 2, name: "Jane", startDate: "2023-11-01", endDate: "2023-11-10", status: "Pending", comment: "" }
    ]);

    const [users, setUsers] = useState([
        // Eksempel data
        { id: 1, name: "John" },
        { id: 2, name: "Jane" }
    ]);

    const handleAccept = (id) => {
        const updatedRequests = requests.map(request => {
            if (request.id === id) {
                request.status = "Accepted";
            }
            return request;
        });
        setRequests(updatedRequests);
    };

    const handleDecline = (id, comment) => {
        const updatedRequests = requests.map(request => {
            if (request.id === id) {
                request.status = "Declined";
                request.comment = comment;
            }
            return request;
        });
        setRequests(updatedRequests);
    };

    const handleAddUser = (name) => {
        setUsers([...users, { id: Date.now(), name }]);
    };

    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <div className="container-for-site">
           <Navbar/>
            <h2 className="text-center mb-4">Admin Panel</h2>
            
            <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                    <h3>Ferieanmodninger</h3>
                    <ul className="list-group mb-4">
                        {requests.map(request => (
                            <li key={request.id} className="list-group-item">
                                {request.name} fra {request.startDate} til {request.endDate}
                                <button className="custom-button ml-2" id="accept" onClick={() => handleAccept(request.id)}>Accepter</button>
                                <button className="custom-button ml-2" id="decline" onClick={() => handleDecline(request.id, "Din kommentar her")}>Afvis</button>
                            </li>
                        ))}
                    </ul>

                    <h3>Brugere</h3>
                    <ul className="list-group">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item">
                                {user.name}
                                <button className="custom-button ml-2" id="delete" onClick={() => handleDeleteUser(user.id)}>Slet</button>
                            </li>
                        ))}
                    </ul>
                    <button className="custom-button mt-3" id="add-user" onClick={() => handleAddUser("Ny bruger navn her")}>+ Add User</button>
                </div>
            </div>
        </div>
    );
}

export default Admin;