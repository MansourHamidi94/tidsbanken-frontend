import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVacationRequestById } from "../../redux/slices/vacationRequest/vacationRequestSlice";
import {
  fetchCommentsByRequestId,
  addCommentToApi,
  selectCommentsByRequestId,
} from "../../redux/slices/comment/commentSlice";
import Navbar from "../navbar/Navbar";
import CommentsModal from "../commentsModal/CommentsModal";
import { fetchAllCommentsForUser } from "../../redux/slices/comment/commentSlice";

import "./VacationRequest.css";

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  return new Date(dateString).toLocaleDateString(undefined, options);
}

function VacationRequest({ requestId }) {
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const dispatch = useDispatch();
  const vacationRequests = useSelector(
    (state) => state.vacationRequest.vacationRequests
  );
  const comments = useSelector((state) =>
    selectCommentsByRequestId(state, currentRequestId)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchVacationRequestById(requestId));
    dispatch(fetchCommentsByRequestId(requestId));
    dispatch(fetchAllCommentsForUser(requestId));
  }, [dispatch, requestId]);

  const handleAddComment = (commentText) => {
    dispatch(
      addCommentToApi({
        requestId: currentRequestId,
        text: commentText,
        author: "CurrentUserName",
      })
    );
  };

  const openModalWithComments = (id) => {
    setCurrentRequestId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="container vacation-request"
      style={{ backgroundColor: "#FFF1E3", padding: "20px" }}
    >
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="row mt-4 justify-content-center">
        {" "}
        {/* Updated line */}
        <div className="col-md-6">
          <div
            className="card"
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="card-header"
              style={{
                backgroundColor: "#444444",
                color: "white",
                borderRadius: "15px 15px 0 0",
              }}
            >
              Your Vacation Requests
            </div>
            <div className="card-body">
              {vacationRequests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #444444",
                    paddingBottom: "10px",
                  }}
                >
                  <h5>Date for request: {formatDate(request.requestDate)}</h5>
                  <p>Start date: {formatDate(request.startDate)}</p>
                  <p>End date: {formatDate(request.endDate)}</p>
                  <p>
                    Status:{" "}
                    <span className="status-label" style={{ color: "#444444" }}>
                      {request.status}
                    </span>
                  </p>
                  <button
                    onClick={openModalWithComments}
                    style={{
                      backgroundColor: "#444444",
                      color: "white",
                      borderRadius: "10px",
                      border: "none",
                      padding: "5px 10px",
                    }}
                  >
                    View/Edit Comments
                  </button>
                </div>
              ))}
            </div>
          </div>
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
