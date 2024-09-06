import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './Login.css';

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Login = () => {
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const handleLogin = (values) => {
        let user = { email: values.email, password: values.password };

        axios
            .post("http://localhost:5199/api/User/Validate", user)
            .then((response) => {
                if (response.status === 204) {
                    setErr("Invalid User Credentials");
                } else {
                    let user = response.data;
                    // Store userId and token in session storage
                    sessionStorage.setItem("userId", user.userId);
                    sessionStorage.setItem("token", user.token);
                    navigate(user.role === "Admin" ? "/AdminDashboard" : "/Home");
                }
            })
            .catch((error) => {
                console.error(error);
                setErr("Error logging in");
            });
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <div className="container login-container">
                    <h1>Login</h1>
                    <button onClick={handleBack} className="back-button">Back</button>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Email</td>
                                            <td>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Password</td>
                                            <td>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Logging in..." : "Login"}
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <span className="text-danger">{err}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <footer>
                <p>&copy; 2024 Twitter. All rights reserved.</p>
                <p>
                    <Link to="">Privacy Policy</Link> | 
                    <Link to="">Terms of Service</Link>
                </p>
                <p>Follow us on 
                    <a href="#" target="_blank" rel="noopener noreferrer"> Twitter</a>
                </p>
            </footer>
        </div>
    );
};

export default Login;
