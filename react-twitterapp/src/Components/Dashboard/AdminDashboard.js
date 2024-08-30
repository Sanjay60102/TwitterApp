import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate(); // Ensure useNavigate() is called correctly
    
    const handleLogout = () => {
        navigate("/Login"); // Ensure the path is correct in your routing setup
    }

    return (
        <div className="container admin-dashboard-container text-center">
            <header className="my-4">
                <h1>Admin Dashboard</h1>
            </header>
            <nav className="nav justify-content-center mb-4">
                <Link className="nav-link" to="">User Details</Link>
                <Link className="nav-link" to="">Tweet Details</Link>
            </nav>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
    );
}

export default AdminDashboard;
