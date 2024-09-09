import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMessage, faUser, faRightFromBracket, faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Home.css';
import Logo from '../../Images/logo.png';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session and redirect to login
        sessionStorage.removeItem("token");
        navigate("/Login");
    };
    
    const handleSearchButton = () => {
        // Pass the searchQuery to the Search page via navigation state
        navigate("./Search", { state: { userId: searchQuery } });
    }

    useEffect(() => {
        if (sessionStorage.getItem("token") === null) {
          navigate("/login");
        }
      }, []);

    return (
        <div className="page-container">
            <div className="dashboard-container">
                <div className="nav-container">
                    <nav className="btn-group-vertical w-100">
                        <Link className="btn btn-outline-primary mb-2" to="">
                            <FontAwesomeIcon icon={faHouse} className="icon-left" /> 
                            Home
                        </Link>
                        <Link className="btn btn-outline-primary mb-2" to="Notifications">
                            <FontAwesomeIcon icon={faMessage} className="icon-left" /> 
                            Notifications
                        </Link>
                        <Link className="btn btn-outline-primary mb-2" to="Profile">
                            <FontAwesomeIcon icon={faUser} className="icon-left" />
                            Profile
                        </Link>
                        <Link className="btn btn-outline-primary mb-2" to="AddTweet">
                            <FontAwesomeIcon icon={faPlus} className="icon-left" />
                            Post
                        </Link>
                        <button onClick={handleLogout} className="btn btn-secondary mt-2">
                            Logout
                        </button>
                    </nav>
                </div>
                <div className="content-container">
                    {/* Title in the center */}
                    <div className="title-container">
                        <img src={Logo} alt="Logo" width="70" height="40"/>
                        <h1 className="title">Twitter</h1>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Enter User ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary search-button" onClick={handleSearchButton}>
                            Search
                        </button>
                    </div>
                    <main className="content">
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

export default Home;
