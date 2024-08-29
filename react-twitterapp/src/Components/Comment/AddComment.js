// Allows the user to add a new comment to a tweet.
import { useState } from "react";
import axios from "axios";

const AddComment = () => {
    const [comment, setComment] = useState({
        commentId: 0,
        tweetId: 0,
        userId: '',
        content: '',
        createdOn: new Date().toISOString(),
    });

    const save = (e) => {
        console.log(comment);
        axios
            .post('http://localhost:5199/api/Comment/AddComment', comment)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.log(error));
        e.preventDefault();
    };

    return (
        <div className="container">
            <h2>Add a Comment</h2>
            <form onSubmit={save}>
                <table className="table">
                    <tr>
                        <td>Tweet ID:</td>
                        <td>
                            <input
                                type="number"
                                value={comment.tweetId}
                                onChange={(e) =>
                                    setComment((prevObj) => ({
                                        ...prevObj,
                                        tweetId: e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>User ID:</td>
                        <td>
                            <input
                                type="text"
                                value={comment.userId}
                                onChange={(e) =>
                                    setComment((prevObj) => ({
                                        ...prevObj,
                                        userId: e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Content:</td>
                        <td>
                            <input
                                type="text"
                                value={comment.content}
                                onChange={(e) =>
                                    setComment((prevObj) => ({
                                        ...prevObj,
                                        content: e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type="submit">Add Comment</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
};

export default AddComment;
