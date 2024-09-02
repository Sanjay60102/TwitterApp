import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css"; // Import the CSS file

const Notifications = () => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");

        // Make a GET request to fetch comments for the specific userId
        axios
            .get(`http://localhost:5199/api/Comment/GetCommentsByUserId/${userId}`)
            .then((res) => {
                if (res.status === 200) {
                    setComments(res.data);  // Set the comments in state
                } else {
                    setError("Error fetching comments");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching comments");
            });
    }, []);  // Empty dependency array ensures this runs only once on mount

    return (
        <div className="comments-container">
            <h3 className="comments-title">Received Comments</h3>
            {error && <p className="error-message text-danger">{error}</p>}
            {comments.length > 0 ? (
                <ul className="comments-list">
                    {comments.map((comment) => (
                        <li key={comment.commentId} className="comment-item">
                            <p className="comment-tweet"><strong>Tweet ID:</strong> {comment.tweetId}</p>
                            <p className="comment-content"><strong>Content:</strong> {comment.content}</p>
                            <p className="comment-created"><small>{new Date(comment.createdAt).toLocaleString()}</small></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-comments">No comments available for this user.</p>
            )}
        </div>
    );
};

export default Notifications;
