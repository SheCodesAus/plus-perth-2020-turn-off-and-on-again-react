import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom"
import { setStorage, isAuthenticated } from "../Utilities/LocalStorage"

function LoginForm({setUsername}) {
    //variables 
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const history = useHistory();

    const [UserData, setUserData] = useState({});
    const { id } = useParams();

  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}organisations/${id}`)
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          setUserData(data);
        });
    }, [id]);

    

    //method
    const handleChange = (e) => {
        const {id, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }))
    }

    const postData = async() => {
        const response = await fetch
        (`${process.env.REACT_APP_API_URL}api-token-auth/`, 
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

    const getData = async() => {
        const response = await fetch
        (`${process.env.REACT_APP_API_URL}users/${id}`, 
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
        if(credentials.username && credentials.password) {
         postData().then((response) => {
                setStorage("token", response.token)
                setStorage("user", credentials.username)
                setUsername(credentials.username)

                getData().then(()=>{
                setStorage("userId", UserData.id)

                })

                if (isAuthenticated()){
                    history.push("/");
                } 
            });
        }
    }


    //template
    return (
        <div className="login-page">
            <form className="login-form">
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
                <button type="submit" onClick={handleSubmit}>Login</button>
                <p className="message">Not registered?</p>
                <Link to="/register">Create an account</Link>
            </form>
        </div>
    )
}

export default LoginForm;
