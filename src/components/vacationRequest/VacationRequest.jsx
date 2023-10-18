import React from 'react';
import './VacationRequest.css';
import Navbar from '../navbar/Navbar';
function VacationRequest() {

    return (
        <div className="container vacation-request">
            <Navbar />
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4>Date for request: 18/10-2023</h4>
                            <p>Start date: 21/10-2023</p>
                            <p>End date: 28/10-2023</p>

                            <h5 className="card-title">Vacation Request: 1</h5>
                            <p className="card-text">
                                Status of vacation: <span className="status-label">Accepted!</span>
                            </p>
                            <input placeholder='Write a comment'></input>
                            <button>Send comment</button>

                            <h4>Comment history:</h4>
                            <p>It was popularised in the 1960s with the release of Letraset sheets containing 
                                Lorem Ipsum passages, and more recently with desktop 
                                publishing software like Aldus PageMaker 
                                including versions of Lorem Ipsum.</p>


                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">History</h5>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Request 1</li>
                                <li className="list-group-item">Request 2</li>
                                <li className="list-group-item">Request 3</li>
                                <li className="list-group-item">Request 4</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default VacationRequest;