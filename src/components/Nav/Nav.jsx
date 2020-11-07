import React,{useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types"
import { ArrowDownCircle, ArrowUpCircle } from "react-feather"

import "./Nav.css"

//internal components used in the main component Nav= cleaner  
//Uses the props setUsername passed in Nav by App
const LogoutButton = ({ setUsername, setOpened }) => (
    <Link className={"navbar-link"} to="/"
    onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setUsername(null)
        setOpened(false)
    }}
    >
    Logout
    </Link>
)

const LoggedOutNav = ({setOpened}) => {
    return (
        <>
        <Link to="/login" className={"navbar-link"} onClick={() => setOpened(false)}>
            Login
        </Link>
        <Link to="/register" className={"navbar-link"} onClick={() => setOpened(false)}>
            Register your organisation
        </Link>
        </>
    )
}

function Nav({ loggedIn, setUsername }) {
    const [opened,setOpened] = useState(false)
    const toggle = () => {
    setOpened(!opened)
}
return (
    <nav className="navbar">
        <div className="navbar-home">
            <a href="/">
                <img
                className="logo"
                src="../TechForMe-Logo512.png"
                alt="TechForMe logo"
                />
            </a>
            <div className="toggle" onClick={toggle}>
                {opened ? <ArrowUpCircle /> : <ArrowDownCircle />}
            </div>
        </div>
        <div className={ `navbar-links ${opened ? `opened` : `closed`}`}>
            <Link to="/" className="navbar-link" onClick={() => {setOpened(false)}}>Home</Link>
            <Link to="/opportunities" className="navbar-link" onClick={() => {setOpened(false)}}>Opportunities</Link>
            <Link to="/organisations" className="navbar-link" onClick={() => {setOpened(false)}}>Organisations</Link>
            <Link to="/about" className="navbar-link" onClick={() => {setOpened(false)}}>About</Link>
            {/* if loggedIn is true, pass the prop setUsername from App.js to the internal component*/}
            {loggedIn ? (
                <>
                <Link to="/organisations/:id" className="navbar-link" onClick={() => setOpened(false)}>
                    My Organisation
                </Link>
                <Link to="/opportunities/create" className="navbar-link" onClick={() => setOpened(false)}>
                    Create a new Opportunity
                </Link>
                <LogoutButton setUsername={setUsername} setOpened={setOpened}/>
                </>
            ) : (
                <LoggedOutNav setUsername={setUsername} setOpened={setOpened}/>
            )}


        </div>
        </nav>
    )
}

export default Nav

Nav.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}