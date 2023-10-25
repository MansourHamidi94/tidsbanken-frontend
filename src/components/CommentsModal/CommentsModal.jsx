import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import { addCommentToApi } from '../../redux/slices/comment/commentsSlice';

function CommentsModal({ isOpen, onClose, comments, requestId }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText.trim()) {
        const currentDate = new Date().toISOString();

        // Dispatch the action to add the comment to the API and store
        dispatch(addCommentToApi({ 
            requestId, 
            comment: {
                message: commentText, 
                dateCommented: currentDate
            }
        }));
        setCommentText("");
    }
};


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">Comments</div>
      <div className="modal-body">
      {comments && comments.length > 0 ? (
    comments.map((comment, index) => (
        comment && comment.message && comment.userName ? (
            <div key={index}>
                <p>{comment.message}</p>
                <small>By {comment.userName}</small>
                <hr />
            </div>
        ) : null
    ))
) : (
    <p>No comments available.</p>
)}
        <div>
          <textarea 
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Add your comment"
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}

export default CommentsModal;
