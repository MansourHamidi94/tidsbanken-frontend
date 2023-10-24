import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchVacationRequestById } from '../../redux/slices/VacationRequestSlice';
// import { fetchCommentsByRequestId, addCommentToApi, selectCommentsByRequestId } from '../../redux/slices/commentSlice';
import Navbar from '../navbar/Navbar';
import CommentsModal from "../commentsModal/CommentsModal.jsx";
import './VacationRequest.css';


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function VacationRequest({ requestId }) {
    const dispatch = useDispatch();
    
    // Mock data
    const mockVacationRequests = [
        {
            id: 1,
            requestDate: new Date().toISOString(),
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            status: 'Pending'
        }
    ];

    const mockComments = [
        {
            id: 1,
            text: 'This is a mock comment.',
            author: 'MockUser',
            requestId: 1
        },
        {
            id: 2,
            text: 'Another mock comment.',
            author: 'MockUser2',
            requestId: 1
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
  

    const handleAddComment = (commentText) => {
      // dispatch(addCommentToApi({ requestId, text: commentText, author: 'CurrentUserName' })); 
      // TODO: Handle adding comment to mock data
    };

    const openModalWithComments = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
        <div className="container vacation-request" style={{ backgroundColor: '#FFF1E3', padding: '20px' }}>
        <Navbar />
        <div className="row mt-4">
            {mockVacationRequests.map((request) => (
                <div className="col-md-6 mb-4" key={request.id}>
                    <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-header" style={{ backgroundColor: '#444444', color: 'white', borderRadius: '15px 15px 0 0' }}>
                            Vacation Request: {request.id}
                        </div>
                        <div className="card-body">
                            <h5>Date for request: {formatDate(request.requestDate)}</h5>
                            <p>Start date: {formatDate(request.startDate)}</p>
                            <p>End date: {formatDate(request.endDate)}</p>
                            <p>Status: <span className="status-label" style={{ color: '#444444' }}>{request.status}</span></p>
                            <button onClick={openModalWithComments} style={{ backgroundColor: '#444444', color: 'white', borderRadius: '10px', border: 'none', padding: '5px 10px' }}>View/Edit Comments</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <CommentsModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            comments={mockComments} 
            onAddComment={handleAddComment} 
            requestId={requestId} 
        />
    </div>
  );
}

export default VacationRequest;
