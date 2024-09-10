import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './GetTweets.css'; // Import the CSS file
import TweetImage from '../../Images/Tweet1.jpg'

const GetTweets = () => {
    const [tweets, setTweets] = useState([]);
    const navigate = useNavigate();

    const handleAddComment = (tweet) => {
        // Navigate to AddComment page with tweet data
        navigate("AddComment", { state: { tweet } });
    }

    useEffect(() => {
        axios
            .get('http://localhost:5199/api/Tweet/GetTweets', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then((response) => {
                console.log(response.data);
                // Reverse the tweets array to show the newest tweet at the top
                setTweets(response.data.reverse());
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="tweets-container">
            <h1>Tweets</h1>
            <p style={{fontSize:"0.75rem"}}>Click on tweet to view Comments</p>
            <div className="tweets-list">
                {tweets.map((tweet) => (
                    <div key={tweet.tweetId} className="tweet-card" onClick={() => handleAddComment(tweet)}>
                        <div className="tweet-userId">Id: {tweet.userId}</div>
                        <img src={TweetImage} alt="TweetImage" width="300" height="250"/>
                        <div className="tweet-message"><strong>{tweet.message}</strong></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetTweets;
