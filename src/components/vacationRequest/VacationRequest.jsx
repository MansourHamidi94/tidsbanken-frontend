import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVacationRequestById } from '../../redux/slices/VacationRequestSlice';
import { fetchCommentsByRequestId, addCommentToApi, selectCommentsByRequestId } from '../../redux/slices/commentsSlice';
import Navbar from '../navbar/Navbar';
import CommentsModal from "../CommentsModal/CommentsModal";


//  format  date 
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
    }, [dispatch, requestId]);

    useEffect(() => {
      dispatch(fetchCommentsByRequestId(requestId));
    }, [dispatch, requestId]);


    //handle the addition of a comment.
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
      <div className="container vacation-request">
        <div className="row">
          {vacationRequests.map((request) => (
            <div className="col-md-6 mb-4" key={request.id}>
              <div className="card">
                <div className="card-header">
                  Vacation Request: {request.id}
                </div>
                <div className="card-body">
                  <h4>Date for request: {formatDate(request.requestDate)}</h4>
                  <p>Start date: {formatDate(request.startDate)}</p>
                  <p>End date: {formatDate(request.endDate)}</p>
                  <p className="card-text">
                    Status of vacation: <span className="status-label">{request.status}</span>
                  </p>
                  <button onClick={openModalWithComments}>View Comments</button>
                </div>
              </div>
            </div>
          ))}
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
