import axios from "axios";
import React, { useEffect, useState } from "react";
import './Posts.css';

const Posts = () => {
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        axios
            .get("http://localhost:5199/api/Tweet/GetTweetsByUserId/" + userId)
            .then((res) => {
                if (res.status === 200) {
                    setTweets(res.data); // Store the fetched tweets in state
                } else {
                    setError("Error fetching Posts");
                }
            })
            .catch((err) => {
                setError("Error fetching Posts");
            });
    }, []);

    return (
        <div className="posts-container">
            <h3 className="posts-header">Here is a list of posts...</h3>
            {error && <p className="error-message">{error}</p>}
            <ul className="posts-list">
                {tweets.map((tweet) => (
                    <li key={tweet.tweetId} className="post-item">
                        <p className="post-message">{tweet.message}</p>
                        <small className="post-date">
                            {new Date(tweet.created).toLocaleString()}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
