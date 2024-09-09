import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Layout.css';

export default function Layout() {
    const navigate = useNavigate();

    const handleRegister = () => navigate("/Register");
    const handleLogin = () => navigate("/Login");

    return (
        <div className="page-container">
            <div className="content-wrap">
                <div className="container text-center layout-container">
                    <header className="my-4">
                        <h1>Twitter</h1>
                    </header>
                    <h3>Join today.</h3>
                    <button onClick={handleRegister} className="btn btn-primary my-2">Create Account</button>
                    <br />
                    <span>or</span>
                    <p>Already have an account?</p>
                    <button onClick={handleLogin} className="btn btn-secondary">Sign In</button>
                </div>
            </div>
            <footer className="mt-4">
                <p>&copy; 2024 Twitter. All rights reserved.</p>
                <p>
                    <Link to="">Privacy Policy</Link> | 
                    <Link to=""> Terms of Service</Link>
                </p>
                <p>Follow us on 
                    <a href="#" target="_blank" rel="noopener noreferrer"> Twitter</a>
                </p>
            </footer>
        </div>
    );
}
