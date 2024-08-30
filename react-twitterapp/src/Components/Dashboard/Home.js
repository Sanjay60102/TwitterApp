import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const handlePost = () => navigate("/AddTweet");
    const handleLogout = () => navigate("/Login");

    return (
        <div className="container home-container">
            <header className="my-4 text-center">
                <h1>Twitter</h1>
            </header>
            <div className="row">
                <div className="col-md-3 nav-container">
                    <nav className="btn-group-vertical w-100">
                        <Link className="btn btn-outline-primary mb-2" to="">Home</Link>
                        <Link className="btn btn-outline-primary mb-2" to="">Explore</Link>
                        <Link className="btn btn-outline-primary mb-2" to="">Messages</Link>
                        <Link className="btn btn-outline-primary mb-2" to="">Profile</Link>
                    </nav>
                </div>
                <div className="col-md-6 text-center">
                    <div className="search-container">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search..."
                        />
                        <button className="btn btn-primary search-button">Search</button>
                    </div>
                    <div className="button-container mt-3">
                        <button onClick={handlePost} className="btn btn-primary mx-2">Post</button>
                        <button onClick={handleLogout} className="btn btn-secondary mx-2">Logout</button>
                    </div>
                </div>
            </div>
            <main className="mt-3">
                <Outlet />
            </main>
            <footer className="text-center mt-4">
                <p>&copy; 2024 Twitter Clone. All rights reserved.</p>
                <p>
                    <Link to="/privacy">Privacy Policy</Link> | 
                    <Link to="/terms"> Terms of Service</Link>
                </p>
                <p>Follow us on 
                    <a href="#" target="_blank" rel="noopener noreferrer"> Twitter</a>
                </p>
            </footer>
        </div>
    );
};

export default Home;
