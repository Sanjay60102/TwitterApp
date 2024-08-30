import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const Validate = (e) => {
        let user = { email, password: pwd };
        axios
            .post("http://localhost:5199/api/User/Validate", user)
            .then((response) => {
                if (response.status === 204) {
                    setErr("Invalid User Credentials");
                } else {
                    let user = response.data;
                    sessionStorage.setItem("token", user.token);
                    navigate(user.role === "Admin" ? "/AdminDashboard" : "/Home");
                }
            });
        e.preventDefault();
    };

    return (
        <div className="container login-container">
            <h1>Login</h1>
            <form onSubmit={Validate}>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input 
                                    type="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <span className="text-danger">{err}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Login;
