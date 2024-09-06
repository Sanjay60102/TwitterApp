import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './Register.css';

// Validation schema using Yup
const validationSchema = Yup.object({
    userId: Yup.string()
        .required("User ID is required"),
    userName: Yup.string()
        .min(2, "User Name is too short!")
        .required("User Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    mobileNumber: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
        .required("Mobile number is required"),
});

const Register = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };
    const handleLogin = () => navigate("/Login");

    const save = (values, { setSubmitting }) => {
        axios
            .post("http://localhost:5199/api/User/Register", values)
            .then((res) => {
                console.log(res.data);
                navigate("/Login");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <div className="container register-container">
                    <h1 className="text-center mb-4">Register</h1>
                    <button onClick={handleBack} className="back-button">Back</button>
                    <Formik
                        initialValues={{
                            userId: "",
                            userName: "",
                            email: "",
                            password: "",
                            mobileNumber: "",
                            role: "User"
                        }}
                        validationSchema={validationSchema}
                        onSubmit={save}
                    >
                        {({ isSubmitting }) => (
                            <Form className="register-form">
                                {/* Form Fields */}
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label text-end">User ID</label>
                                    <div className="col-sm-8">
                                        <Field
                                            type="text"
                                            name="userId"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="userId"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label text-end">User Name</label>
                                    <div className="col-sm-8">
                                        <Field
                                            type="text"
                                            name="userName"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="userName"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label text-end">Email</label>
                                    <div className="col-sm-8">
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label text-end">Password</label>
                                    <div className="col-sm-8">
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label text-end">Mobile Number</label>
                                    <div className="col-sm-8">
                                        <Field
                                            type="text"
                                            name="mobileNumber"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="mobileNumber"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                    {isSubmitting ? "Registering..." : "Register"}
                                </button>
                                <br />
                                <span>Or</span>
                                <p>Already have an account?</p>
                                <button onClick={handleLogin} className="btn btn-secondary w-25">Login</button>
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

export default Register;
