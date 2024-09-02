import axios from "axios";
import React, { useEffect, useState } from "react";
import './Followers.css';

const Followers = () => {
    const [followings, setFollowers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        axios
            .get("http://localhost:5199/api/Follow/GetFollowings/" + userId)
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
            <h3>Here is a list of Following...</h3>
            {error && <p className="error-message">{error}</p>}
            <ul className="followers-list">
                {followings.map((following) => (
                    <li key={following.userId} className="follower-item">
                        <h4>{following.userName}</h4>
                        <p>User ID: {following.userId}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Followers;
