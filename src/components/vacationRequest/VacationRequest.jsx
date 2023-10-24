import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVacationRequestById } from '../../redux/slices/VacationRequestSlice';
import { fetchCommentsByRequestId, addCommentToApi, selectCommentsByRequestId } from '../../redux/slices/commentsSlice';
import Navbar from '../navbar/Navbar';
import CommentsModal from "../CommentsModal/CommentsModal";
import './VacationRequest.css';





// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
function VacationRequest({ requestId }) {
    const dispatch = useDispatch();
    const vacationRequests = useSelector((state) => state.vacationRequest.vacationRequests);
    const comments = useSelector(state => selectCommentsByRequestId(state, requestId));
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
      dispatch(fetchVacationRequestById(requestId));
      dispatch(fetchCommentsByRequestId(requestId));
    }, [dispatch, requestId]);
    // Handle the addition of a comment.
    const handleAddComment = (commentText) => {
      dispatch(addCommentToApi({ requestId, text: commentText, author: 'CurrentUserName' }));
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
              <div className="col-md-6">
                  <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <div className="card-header" style={{ backgroundColor: '#444444', color: 'white', borderRadius: '15px 15px 0 0' }}>
                          Your Vacation Requests
                      </div>
                      <div className="card-body">
                          {vacationRequests.map((request) => (
                              <div key={request.id} style={{ marginBottom: '20px', borderBottom: '1px solid #444444', paddingBottom: '10px' }}>
                                  <h5>Date for request: {formatDate(request.requestDate)}</h5>
                                  <p>Start date: {formatDate(request.startDate)}</p>
                                  <p>End date: {formatDate(request.endDate)}</p>
                                  <p>Status: <span className="status-label" style={{ color: '#444444' }}>{request.status}</span></p>
                                  <button onClick={openModalWithComments} style={{ backgroundColor: '#444444', color: 'white', borderRadius: '10px', border: 'none', padding: '5px 10px' }}>View/Edit Comments</button>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                 
                     
              </div>
          </div>
          <CommentsModal
              isOpen={isModalOpen}
              onClose={closeModal}
              comments={comments}
              onAddComment={handleAddComment}
              requestId={requestId}
          />
      </div>
    );
}
export default VacationRequest;