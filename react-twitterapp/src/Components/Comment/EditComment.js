import { useState } from "react";
import axios from "axios";

const EditComments = () => {
    const [comments, setComments] = useState([]); // Array of comments
    const [tweetId, setTweetId] = useState(0); // TweetId input
    const [error, setError] = useState("");

    // Search comments by TweetId
    const searchByTweetId = (e) => {
        e.preventDefault();
        console.log(tweetId);
        axios
            .get(`http://localhost:5199/api/Comment/GetCommentsByTweetId/${tweetId}`)
            .then((res) => {
                console.log(res);
                if (res.data.length > 0) setComments(res.data); // Set all comments found
                else {
                    setError("No comments found for this TweetId");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching comments by TweetId");
            });
    };

    // Save the edited comment
    const save = (comment) => {
        axios
            .put("http://localhost:5199/api/Comment/UpdateComment", comment)
            .then((res) => {
                console.log(res.data);
                setError("");
            })
            .catch((err) => {
                console.error(err);
                setError("Error updating the comment");
            });
    };

    // Delete the comment
    const remove = (commentId) => {
        axios
            .delete(`http://localhost:5199/api/Comment/DeleteComment/${commentId}`)
            .then((res) => {
                setComments(comments.filter((comment) => comment.commentId !== commentId)); // Remove comment from state
            })
            .catch((err) => {
                console.error(err);
                setError("Error deleting the comment");
            });
    };

    // Handle input change for each comment
    const handleInputChange = (index, field, value) => {
        const updatedComments = [...comments];
        updatedComments[index][field] = value;
        setComments(updatedComments);
    };

    return (
        <div className="container">
            <h1>Edit Comments</h1>
            <form onSubmit={searchByTweetId}>
                <div>
                    <label>Tweet ID</label>
                    <input 
                        type="number"
                        value={tweetId}
                        onChange={(e) => setTweetId(e.target.value)}
                    />
                    <button type="submit">Search by TweetId</button>
                </div>
            </form>
            {comments.length > 0 ? (
                <form>
                    {comments.map((comment, index) => (
                        <table className="table" key={comment.commentId}>
                            <tr>
                                <td>Comment ID</td>
                                <td>
                                    <input 
                                        type="number"
                                        value={comment.commentId}
                                        readOnly // CommentId shouldn't be editable
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>User ID</td>
                                <td>
                                    <input 
                                        type="text"
                                        value={comment.userId}
                                        onChange={(e) =>
                                            handleInputChange(index, "userId", e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Content</td>
                                <td>
                                    <input 
                                        type="text"
                                        value={comment.content}
                                        onChange={(e) =>
                                            handleInputChange(index, "content", e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type="button" onClick={() => save(comment)}>
                                        Save Comment
                                    </button>
                                    <button type="button" onClick={() => remove(comment.commentId)}>
                                        Delete Comment
                                    </button>
                                </td>
                            </tr>
                        </table>
                    ))}
                </form>
            ) : (
                <p>{error}</p>
            )}
        </div>
    );
};

export default EditComments;
