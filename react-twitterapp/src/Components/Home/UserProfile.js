import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import "./UserProfile.css";

const Profile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePosts = () => navigate("Posts");
    const handleFollowers = () => navigate("Followers");
    const handleFollowing = () => navigate("Following");
    const handleEditProfile = () => navigate("/EditProfile");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        axios
            .get("http://localhost:5199/api/User/GetUserById/" + userId)
            .then((res) => {
                if (res.status === 200) setUser(res.data);
                else setError("Error fetching profile");
            })
            .catch((err) => {
                setError("Error fetching profile");
            });
    }, []);

    return (
        <div className="profile-container">
            <h2 className="text-start">Hello, {user.userName}</h2>
            <button
                className="btn btn-secondary edit-button"
                onClick={handleEditProfile}>Edit Profile
            </button>
            <div className="profile-details">
                <td className="text-start fw-bolder">{user.userId}</td>
                <td className="text-start fw-semibold">{user.email}</td>
                <td className="text-start fw-semibold">{user.mobileNumber}</td>
            </div>
            <div className="profile-links">
                <button onClick={handlePosts} className="profile-link">Posts</button>
                <button onClick={handleFollowers} className="profile-link">Followers</button>
                <button onClick={handleFollowing} className="profile-link">Following</button>
            </div>
            <Outlet/>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default Profile;
