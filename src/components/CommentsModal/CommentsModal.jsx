import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../modal/Modal";
import { addCommentToApi } from "../../redux/slices/comment/commentSlice";
import "./CommentsModal.css";

function CommentsModal({ isOpen, onClose, comments, requestId }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText.trim()) {
      const currentDate = new Date().toISOString();
      // Dispatch the action to add the comment to the API and store
      dispatch(
        addCommentToApi({
          requestId,
          comment: {
            message: commentText,
            dateCommented: currentDate,
          },
        })
      );
      setCommentText("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">Comments</div>
      <div className="modal-body">
        {comments &&
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment.message}</p>
              <small>By {comment.userName}</small>
            </div>
          ))}
        <div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your comment"
          />
        </div>
        <button className="button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </Modal>
  );
}

export default CommentsModal;
