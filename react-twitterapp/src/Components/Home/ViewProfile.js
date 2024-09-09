import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
const ViewProfile = () => {
    const [user, setUser] = useState({});
    const [postCount, setPostCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [error, setError] = useState("");

    

    useEffect(() =>{
        const userId = sessionStorage.getItem("userId");

        const fetchUserData = async () => {
            try {
                // Fetch user profile details
                const userRes = await axios.get(`http://localhost:5199/api/User/GetUserById/${userId}`);
                if (userRes.status === 200) {
                    setUser(userRes.data);
                } else {
                    setError("Error fetching profile");
                }

                // // Fetch post count
                const postRes = await axios.get(`http://localhost:5199/api/Tweet/GetTweetsByUserId/${userId}`);
                if (postRes.status === 200) {
                    setPostCount(postRes.data.length);
                }

                // Fetch follower count
                const followerRes = await axios.get(`http://localhost:5199/api/Follow/GetFollowers/${userId}`);
                if (followerRes.status === 200) {
                    setFollowerCount(followerRes.data.length);
                }

                // Fetch following count
                const followingRes = await axios.get(`http://localhost:5199/api/Follow/GetFollowings/${userId}`);
                if (followingRes.status === 200) {
                    setFollowingCount(followingRes.data.length);
                }

            } catch (err) {
                setError("Error fetching profile data");
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="profile-container">
            <h2 className="text-start">{user.userName}</h2>
            <div className="profile-details">
                <p className="text-start fw-bolder">User ID: {user.userId}</p>
                <p className="text-start fw-semibold">Email: {user.email}</p>
                <p className="text-start fw-semibold">Mobile: {user.mobileNumber}</p>
            </div>
            <div className="profile-links">
                <button className="profile-link">Posts ({postCount})</button>
                <button className="profile-link">Followers ({followerCount})</button>
                <button className="profile-link">Following ({followingCount})</button>
            </div>
            <Outlet/>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}
export default ViewProfile;