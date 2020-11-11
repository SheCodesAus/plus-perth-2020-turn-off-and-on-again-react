import React from "react";
import {Link} from "react-router-dom";

import "./Footer.css";

function Footer() {
    return (
        <footer>
            <Link to="/" className="navbar-link" >Home</Link>
            <Link to="/about" className="navbar-link" >About</Link>

        </footer>
    );
}

export default Footer;