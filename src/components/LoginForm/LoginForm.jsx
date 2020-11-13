import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"


function LoginForm({ setUsername, setOrganisation }) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const history = useHistory()
    
    //update the variable credentials when entering data in the input
    const handleChange = (e) => {
        const { id, value } = e.target
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
        }))
    }
    //function saveusername uses the token returned from handleLogin
    //we created a users/me to get the info from the current user logged in like username
    const saveUsername = async (token) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}users/me`, {
        headers: {
            Authorization: `Token ${token}`,
        },
        })
        const data = await res.json()
        window.localStorage.setItem("username", data.username)
        window.localStorage.setItem("organisation", data.organisation)
        setUsername(data.username)
    }
    // getting the token is related to login so good practice to associate it to the login component
    // send the credentials to the api-token-auth to get a token back
    // save token in localstorage and return the token
    const fetchToken = async () => {
        try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api-token-auth/`,
            {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            }
        )
        const data = await response.json()
        if (data.token !== undefined) {
            window.localStorage.setItem("token", data.token)
            history.push("/")
            return data.token
        } else {
            alert("wrong username/password")
        }
        } catch (error) {
        alert("Network error", error.message)
        }
    }
    //when form subimtted, save credentials and create a const token with return of fetchToken function
    // pass token to saveUsername function
    const handleLogin = async (e) => {
        //prevent the default behavior of the button
        e.preventDefault()
        if (credentials.username && credentials.password) {
        const token = await fetchToken()
        if (token !== undefined) {
            await saveUsername(token)
        }
        }
    }
    //template
    return (
        <div className="small-form">
            <form className="login-form" onSubmit={handleLogin}>
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
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" placeholder="Enter password" 
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
                <p className="message">Not registered?</p>
                <Link to="/register">Create an account</Link>
            </form>
        </div>
    )
}

export default LoginForm;
