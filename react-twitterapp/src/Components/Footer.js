// src/Components/Footer/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Twitter Clone. All rights reserved.</p>
            <p>
                <Link to="/privacy">Privacy Policy</Link> | 
                <Link to="/terms">Terms of Service</Link>
            </p>
            <p>Follow us on 
                <a href="#" target="_blank" rel="noopener noreferrer"> Twitter</a>
            </p>
        </footer>
    );
};

export default Footer;
