import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const location = useLocation();
    const [userDetails, setUserDetails] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState("");

    const userId = sessionStorage.getItem("userId"); // Logged-in user's ID
    const searchedUserId = location.state?.userId; // Searched user ID

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5199/api/User/GetUserById/${searchedUserId}`);
                setUserDetails(response.data);
                setError("");
                checkFollowingStatus(); // Check if the logged-in user is already following the searched user
            } catch (err) {
                setError("User not found");
                setUserDetails(null); // Clear previous user details
            }
        };

        const checkFollowingStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:5199/api/Follow/GetFollowings/${userId}`);
                const followingIds = response.data.map(following => following.userId);
                setIsFollowing(followingIds.includes(searchedUserId));
            } catch (err) {
                console.error("Error checking following status:", err);
            }
        };

        if (searchedUserId) {
            fetchUserDetails();
        }
    }, [searchedUserId, userId]);

    const handleFollowToggle = async () => {
        if (isFollowing) {
            // Unfollow the user
            try {
                await axios.delete(`http://localhost:5199/api/Follow/RemoveFollowing/${userId}/${searchedUserId}`);
                setIsFollowing(false);
            } catch (err) {
                console.error("Error unfollowing the user:", err);
            }
        } else {
            // Follow the user
            try {
                await axios.post("http://localhost:5199/api/Follow/AddFollowing", {
                    userId: userId,
                    followingId: searchedUserId
                });
                setIsFollowing(true);
            } catch (err) {
                console.error("Error following the user:", err);
            }
        }
    };

    return (
        <div className="search-page">
            {error && <p className="error-message text-danger">{error}</p>}
            {userDetails && (
                <div className="user-details">
                    <h3>User Profile</h3>
                    <p><strong>User ID:</strong> {userDetails.userId}</p>
                    <p><strong>Name:</strong> {userDetails.userName}</p>
                    <button 
                        onClick={handleFollowToggle} 
                        className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"}`}
                    >
                        {isFollowing ? "Following" : "Follow"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Search;
