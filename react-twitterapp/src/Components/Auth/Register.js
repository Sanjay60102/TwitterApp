import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    const [user, setUser] = useState({
        userId: "",
        userName: "",
        email: "",
        password: "",
        mobileNumber: 0,
        role: ""
    });
    const navigate = useNavigate();

    const save = (e) => {
        e.preventDefault(); // Prevent form submission
        axios
            .post('http://localhost:5199/api/User/Register', user)
            .then((res) => {
                console.log(res.data);
                navigate("/Login"); // Redirect after successful registration
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container register-container">
            <h1 className="text-center mb-4">Register</h1>
            <form onSubmit={save} className="register-form">
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">User ID</label>
                    <div className="col-sm-8">
                        <input 
                            type="text"
                            className="form-control"
                            value={user.userId}
                            onChange={(e) =>
                                setUser((prevObj) => ({
                                    ...prevObj,
                                    userId: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">User Name</label>
                    <div className="col-sm-8">
                        <input 
                            type="text"
                            className="form-control"
                            value={user.userName}
                            onChange={(e) =>
                                setUser((prevObj) => ({
                                    ...prevObj,
                                    userName: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">Email</label>
                    <div className="col-sm-8">
                        <input 
                            type="email"
                            className="form-control"
                            value={user.email}
                            onChange={(e) =>
                                setUser((prevObj) => ({
                                    ...prevObj,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">Password</label>
                    <div className="col-sm-8">
                        <input 
                            type="password"
                            className="form-control"
                            value={user.password}
                            onChange={(e) =>
                                setUser((prevObj) => ({
                                    ...prevObj,
                                    password: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">Mobile Number</label>
                    <div className="col-sm-8">
                        <input 
                            type="number"
                            className="form-control"
                            value={user.mobileNumber}
                            onChange={(e) =>
                                setUser((prevObj) => ({
                                    ...prevObj,
                                    mobileNumber: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">Role</label>
                    <div className="col-sm-8 d-flex align-items-center">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="adminRole"
                                value="Admin"
                                checked={user.role === "Admin"}
                                onChange={(e) =>
                                    setUser((prevObj) => ({
                                        ...prevObj,
                                        role: e.target.value,
                                    }))
                                }
                            />
                            <label className="form-check-label" htmlFor="adminRole">Admin</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="userRole"
                                value="User"
                                checked={user.role === "User"}
                                onChange={(e) =>
                                    setUser((prevObj) => ({
                                        ...prevObj,
                                        role: e.target.value,
                                    }))
                                }
                            />
                            <label className="form-check-label" htmlFor="userRole">User</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
}

export default Register;
