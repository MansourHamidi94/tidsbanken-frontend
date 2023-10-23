import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../model/Modal';
import { addCommentToApi } from '../../redux/slices/commentSlice';
import './CommentsModal.css';

function CommentsModal({ isOpen, onClose, comments, requestId }) {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);

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

    const toggleShowAllComments = () => {
        setShowAllComments(prevState => !prevState);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-header">Comments</div>
            <div className="modal-body">
                {comments && comments.length > 2 ? (
                    <>
                        {comments.slice(-2).map((comment, index) => (
                            <div key={index} className="comment">
                                <p>{comment.message}</p>
                                <small>By {comment.userName}</small>
                            </div>
                        ))}
                        <button className="button" onClick={toggleShowAllComments}>
                            {showAllComments ? "Show Less" : "Show More"}
                        </button>
                        {showAllComments && (
                            <div className="older-comments">
                                {comments.slice(0, -2).map((comment, index) => (
                                    <div key={index} className="comment">
                                        <p>{comment.message}</p>
                                        <small>By {comment.userName}</small>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.message}</p>
                            <small>By {comment.userName}</small>
                        </div>
                    ))
                )}
                <div>
                    <textarea
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Add your comment"
                    />
                </div>
                <button className="button" onClick={handleAddComment}>Add Comment</button>
            </div>
            <div className="modal-footer">
                <button className="button" onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
}

export default CommentsModal;
