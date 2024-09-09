import { useState, useEffect } from "react";
import axios from "axios";
import './GetTweetsAdmin.css'; // Import the CSS file

const GetTweetsAdmin = () => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5199/api/Tweet/GetTweets', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setTweets(response.data);
            })
            .catch((error) => console.log(error));
    }, []);


    return (
        <div className="tweets-container">
            <h1>Tweets</h1>
            <div className="tweets-list">
                {tweets.map((tweet) => (
                    <div key={tweet.tweetId} className="tweet-card">
                        <div className="tweet-userId">{tweet.userId}</div>
                        <div className="tweet-message">{tweet.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetTweetsAdmin;
