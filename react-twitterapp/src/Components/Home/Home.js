import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css';

const UserDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [userDetails, setUserDetails] = useState(null); // State to store user details
    const [error, setError] = useState(""); // State to store error message
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session and redirect to login
        sessionStorage.removeItem("token");
        navigate("/Login");
    };

    const handleSearch = () => {
        axios.get(`http://localhost:5199/api/User/GetUserById/${searchQuery}`)
            .then(res => {
                if (res.status === 200) {
                    setUserDetails(res.data); // Set user details in state
                    setError(""); // Clear any previous errors
                } else {
                    setUserDetails(null);
                    setError("User not found.");
                }
            })
            .catch(err => {
                console.error(err);
                setUserDetails(null);
                setError("Error fetching user details.");
            });
    };

    return (
        <div className="page-container">
            <div className="dashboard-container">
                <div className="nav-container">
                    <nav className="btn-group-vertical w-100">
                        <Link className="btn btn-outline-primary mb-2" to="">Home</Link>
                        <Link className="btn btn-outline-primary mb-2" to="Notifications">Notifications</Link>
                        <Link className="btn btn-outline-primary mb-2" to="Profile">Profile</Link>
                        <Link className="btn btn-outline-primary mb-2" to="AddTweet">Post</Link>
                        <button onClick={handleLogout} className="btn btn-secondary mt-2">Logout</button>
                    </nav>
                </div>
                <div className="content-container">
                    {/* Title in the center */}
                    <div className="title-container">
                        <h1 className="title">Twitter</h1>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary search-button" onClick={handleSearch}>Search</button>
                    </div>
                    <main className="content">
                        {error && <p className="error-message text-danger">{error}</p>}
                        {userDetails && (
                            <div className="user-details">
                                <h3>User Profile</h3>
                                <p><strong>User ID:</strong> {userDetails.userId}</p>
                                <p><strong>Name:</strong> {userDetails.userName}</p>
                            </div>
                        )}
                        <Outlet />
                    </main>
                </div>
            </div>
            <footer className="footer text-center mt-4">
                <p>&copy; 2024 Twitter. All rights reserved.</p>
                <p>
                    <Link to="/privacy">Privacy Policy</Link> | 
                    <Link to="/terms">Terms of Service</Link>
                </p>
                <p>Follow us on 
                    <a href="#" target="_blank" rel="noopener noreferrer"> Twitter</a>
                </p>
            </footer>
        </div>
    );
};

export default UserDashboard;
