import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './GetTweets.css'; // Import the CSS file

const GetTweets = () => {
    const [tweets, setTweets] = useState([]);
    const navigate = useNavigate();

    const handleAddComment = (tweet) => {
        // Navigate to AddComment page with tweet data
        navigate("/AddComment", { state: { tweet } });
    }

    useEffect(() => {
        axios
            .get('http://localhost:5199/api/Tweet/GetTweets',{
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem("token")}`
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
                    <div key={tweet.tweetId} className="tweet-card" onClick={() => handleAddComment(tweet)}>
                        
                            <div className="tweet-userId">{tweet.userId}</div>
                            <div className="tweet-message">{tweet.message}</div>
                        {/* <button 
                            className="btn btn-outline-secondary btn-sm" 
                            onClick={() => handleAddComment(tweet)}
                        >
                            Add Comment
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetTweets;
