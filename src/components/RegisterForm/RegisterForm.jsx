import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import "./RegisterForm.css"

function RegisterForm() {
    //variables 
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
    });
    const history = useHistory();


    //method
    const handleChange = (e) => {
        const {id, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }))
    }

    const postUser = async() => {
        const response = await fetch
        (`${process.env.REACT_APP_API_URL}users/`, 
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
        );
        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(credentials.username && credentials.email) {
         postUser().then((request) => {
                window.localStorage.setItem("username", request.username);
                history.push("/login");
            });
        }
    }


    //template
    return (
        <div className="form-page">
            <form >
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Enter username" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" placeholder="Enter email" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" placeholder="Enter Password" 
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Register</button>
                <p className="message">Already registered?</p>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

export default RegisterForm;
