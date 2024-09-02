import axios from "axios";
import React, { useEffect, useState } from "react";
import './Followers.css';

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        axios
            .get("http://localhost:5199/api/Follow/GetFollowers/" + userId)
            .then((res) => {
                if (res.status === 200) {
                    setFollowers(res.data);
                } else {
                    setError("Error fetching Followers");
                }
            })
            .catch(() => {
                setError("Error fetching Followers");
            });
    }, []);

    return (
        <div className="followers-container">
            <h3>Here is a list of Followers...</h3>
            {error && <p className="error-message">{error}</p>}
            <ul className="followers-list">
                {followers.map((follower) => (
                    <li key={follower.userId} className="follower-item">
                        <h4>{follower.userName}</h4>
                        <p>User ID: {follower.userId}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Followers;
