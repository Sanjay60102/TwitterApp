import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
    const [user, setUser] = useState({
        userName: "",
        email: "",
        mobileNumber: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        axios
            .get("http://localhost:5199/api/User/GetUserById/" + userId)
            .then((res) => {
                if (res.status === 200) setUser(res.data);
                else setError("Error fetching profile data");
            })
            .catch((err) => {
                setError("Error fetching profile data");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem("userId");
        axios
            .put("http://localhost:5199/api/User/EditProfile", user)
            .then((res) => {
                if (res.status === 200) {
                    setSuccess("Profile updated successfully");
                    setError("");
                    navigate("/Home/Profile");
                } else {
                    setError("Error updating profile");
                }
            })
            .catch((err) => {
                setError("Error updating profile");
            });
    };

    const handleDelete = () => {
        const userId = sessionStorage.getItem("userId");
        axios
            .delete(`http://localhost:5199/api/User/DeleteProfile/${userId}`)
            .then((res) => {
                if (res.status === 200) {
                    setSuccess("Profile deleted successfully");
                    sessionStorage.clear(); // Clear session
                    navigate("/Login"); // Redirect to login after deletion
                } else {
                    setError("Error deleting profile");
                }
            })
            .catch((err) => {
                setError("Error deleting profile");
            });
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={user.userName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={user.mobileNumber}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
                {/* <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                >
                    Delete Profile
                </button> */}
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default EditProfile;
