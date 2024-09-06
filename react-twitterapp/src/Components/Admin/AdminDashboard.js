import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session and redirect to login
        sessionStorage.removeItem("token");
        navigate("/Login");
    };

    const handleHome = () => {
        navigate("/AdminDashboard");
    };

    return (
        <div className="dashboard-container">
            <nav className="admin-nav">
                <ul>
                <li>
                    <button onClick={handleHome} className="home-btn">Home</button></li>
                    <li><Link to="GetUsers">Get Users</Link></li>
                    <li><Link to="GetTweetsAdmin">Get Tweets</Link></li>
                    <li><Link to="AddTweet">Add Post</Link></li>
                    <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                </ul>
            </nav>
            <div className="admin-content">
                <h1>Twitter</h1>
                <h4>Welcome to Admin Dashboard</h4>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
