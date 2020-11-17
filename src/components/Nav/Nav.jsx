import React,{useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types"
import { ArrowDownCircle, ArrowUpCircle, ChevronDown } from "react-feather"
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import "./Nav.css"


//internal components used in the main component Nav= cleaner  
//Uses the props setUsername passed in Nav by App
const LogoutButton = ({ setUsername, setOpened }) => (
    <Link className={"navbar-link"} to="/"
    onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("organisation")
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
            <Link to="/register" className={"navbar-link"} onClick={() => setOpened(false)}>
                Register
            </Link>
            <Link to="/login" className={"navbar-link"} onClick={() => setOpened(false)}>
                Login
            </Link>
        </>
    )
}

function Nav({ loggedIn, setUsername, setOrganisation }) {
    const [opened,setOpened] = useState(false)
    const toggle = () => {
    setOpened(!opened)
}
const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(3);
const organisationSlug = window.localStorage.getItem("organisation")

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
            {/* if loggedIn is true, pass the prop setUsername from App.js to the internal component*/}
            {loggedIn ? (
                <>
                <button {...buttonProps}type='button' id='menu-button' className="navbar-link">
				<span>My Organisation</span>
				<ChevronDown/></button>
                <div className={isOpen ? 'visible' : ''} role='menu' id='menu'>
                    {organisationSlug !== "not-in-the-list" ?  
                    <>
                    <Link {...itemProps[0]} to={`/organisations/${organisationSlug}`} className="navbar-link" onClick={() => {setOpened(false); setIsOpen(false)}}>
                        My Organisation Profile
                    </Link>
                    <Link {...itemProps[1]} to="/opportunities/create" className="navbar-link" onClick={() => {setOpened(false); setIsOpen(false)}}>
                        Create a new Opportunity
                    </Link>
                    </>
                    :
                    <Link {...itemProps[1]} to="/organisations/register" className="navbar-link" onClick={() => {setOpened(false); setIsOpen(false)}}>
                        Register your Organisation
                    </Link>}
                    <LogoutButton setUsername={setUsername} setOpened={setOpened} setOrganisation={setOrganisation}/>
                    

                </div>
                </>
            ) : (
                <LoggedOutNav setOpened={setOpened} />
            )}


        </div>
        </nav>
    )
}

export default Nav

Nav.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}