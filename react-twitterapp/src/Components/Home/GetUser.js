import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation hook to access route state
import axios from "axios";
import "./GetUser.css";

const GetUser = () => {
    const location = useLocation();  // Get the location object
    const [userId, setUserId] = useState("");  // State for userId
    const [user, setUser] = useState(null);  // State for user details
    const [error, setError] = useState("");  // State for error messages

    // Fetch the user based on userId when the component loads
    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);  // Set userId from the location state
            handleSearch(location.state.userId);  // Call handleSearch to fetch the user details
        }
    }, [location.state]);

    // Handle search operation
    const handleSearch = (id) => {
        axios
            .get(`http://localhost:5199/api/User/GetUserById/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data);
                    setError("");
                } else {
                    setError("User not found");
                    setUser(null);
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching user");
                setUser(null);
            });
    };

    return (
        <div className="search-container">
            {/* Input field for entering User ID */}
            <input
                type="text"
                className="form-control search-input"
                placeholder="Enter User ID"
                value={userId}  // Bind input to userId state
                onChange={(e) => setUserId(e.target.value)}  // Update userId state on input change
            />
            {/* Search button to trigger search */}
            <button className="btn btn-primary search-button" onClick={() => handleSearch(userId)}>
                Search
            </button>

            {/* Display error message if any */}
            {error && <p className="error-message text-danger">{error}</p>}

            {/* Display user details if found */}
            {user && (
                <div className="user-details">
                    <h3 className="user-name">{user.userName}</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile:</strong> {user.mobileNumber}</p>
                </div>
            )}
        </div>
    );
};

export default GetUser;
