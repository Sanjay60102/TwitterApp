import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './AddComment.css'

const AddComment = () => {
    const location = useLocation();
    const tweet = location.state.tweet;  // Retrieve tweet data from state
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const userId = sessionStorage.getItem("userId"); // Get userId from sessionStorage

    // Fetch existing comments for the tweet
    useEffect(() => {
        axios
            .get(`http://localhost:5199/api/Comment/GetCommentsByTweetId/${tweet.tweetId}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => console.log(error));
    }, [tweet.tweetId]);

    const handleAddComment = (e) => {
        e.preventDefault();
        const comment = {
            tweetId: tweet.tweetId,
            userId: userId,
            content: newComment,
            createdOn: new Date().toISOString(),
        };

        axios
            .post('http://localhost:5199/api/Comment/AddComment', comment,{
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setComments([...comments, response.data]); // Update the comments list
                setNewComment(''); // Clear the input
            })
            .catch((error) => console.log(error));
    };
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/Home");
    }

    return (
        <div className="container">
            <button onClick={handleBack} className="back-button">Back</button>
            <p>Comments</p>
            <div className="tweet-details">
                <h3> {tweet.message}</h3>
                {/* <p><strong>Tweet ID:</strong> {tweet.tweetId}</p> */}
                {/* <p><strong>User ID:</strong> {tweet.userId}</p> */}
            </div>

            <div className="comments-section">
                <p>Existing Comments</p>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.commentId} className="comment">
                            <h6>{comment.content}</h6>
                            <small>By User: {comment.userId}</small>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>

            <form onSubmit={handleAddComment}>
                <div className="form-group">
                    <p htmlFor="newComment">Add a comment...</p>
                    <textarea
                        type="text"
                        id="newComment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="form-control"
                        placeholder="Write comment..."
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
        </div>
    );
};

export default AddComment;
