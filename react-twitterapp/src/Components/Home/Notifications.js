import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css"; // Import the CSS file

const Notifications = () => {
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");

        // Make a GET request to fetch tweets by followingId
        axios
            .get(`http://localhost:5199/api/Tweet/GetTweetsByFollowingId/${userId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    setTweets(res.data.reverse());  // Set the tweets in state
                } else {
                    setError("Error fetching tweets");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching tweets");
            });
    }, []);  // Empty dependency array ensures this runs only once on mount

    return (
        <div className="tweets-container">
            <h3 className="tweets-title">Tweets by Followed Users</h3>
            {error && <p className="error-message">{error}</p>}
            {tweets.length > 0 ? (
                <ul className="tweets-list">
                    {tweets.map((tweet) => (
                        <li key={tweet.tweetId} className="tweet-item">
                            <p className="tweet-userId">User ID: {tweet.userId}</p>
                            <p className="tweet-message"><strong>Tweet:</strong> {tweet.message}</p>
                            <p className="tweet-created"><small>{new Date(tweet.created).toLocaleString()}</small></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-tweets">No tweets available from followed users.</p>
            )}
        </div>
    );
};

export default Notifications;
