import React from "react";
import {Link} from "react-router-dom";

import "./Footer.css";

function Footer() {
    return (
        <footer>
            <Link to="/" className="navbar-link" >Home</Link>
            <Link to="/about" className="navbar-link" >About</Link>
            <p className="navbar-link">@ Copyright SheCodes 2020 TechForMe team</p>
        </footer>
    );
}

export default Footer;