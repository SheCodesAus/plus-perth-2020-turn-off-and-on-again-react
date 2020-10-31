import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css";

function Nav() {
    return (
        <nav>
            <Link id="nav-home" to ="/">Home</Link>
            <Link to ="/about">About</Link>
            <Link to ="/opportunities">Opportunities</Link>
            <Link to ="/organisations">Organisations</Link>
            <Link to ="/register">Register</Link>
            <Link to ="/profile">Profile</Link>
            <Link to ="/login">Login</Link>
        </nav>
    );
}

export default Nav;