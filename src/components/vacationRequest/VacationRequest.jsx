import React from 'react';
import './VacationRequest.css';
import Navbar from '../navbar/Navbar';
function VacationRequest() {

    return( 
<div className="container vacation-request">
<Navbar/>
<div className="row">
    <div className="col-md-6">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Vacation Request: 1</h5>
                <p className="card-text">
                    Status of vacation: <span className="status-label">Accepted!</span>
                </p>
                <p className="card-text">Comment: Your request has been approved.</p>
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