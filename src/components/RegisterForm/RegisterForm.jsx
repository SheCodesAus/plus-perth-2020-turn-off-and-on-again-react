import React, { useState, useEffect, Element} from "react"
import { Link, useHistory } from "react-router-dom"
import Dropdown from "../Dropdown/Dropdown"

function RegisterForm() {
    //variables 
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        organisation: ""
    });
    const [hasError, setErrors] = useState(false)
    const [organisations, setOrganisations] = useState([])
    const history = useHistory();

      // useEffect function to get the DATA from 2 different endpiints
  // because use async await no need to use promise .then .catch
  // adding [] at the end of the useEffect avoid looping
  useEffect(() => {
    async function fetchOrganisations() {
      try {
        const r = await fetch(`${process.env.REACT_APP_API_URL}organisations/`);
        const organisations = await r.json()
        let setOrganisationsList = organisations.map((org) => {
            return {name: org.organisation, id: org.id}
        })

    
        setOrganisations(setOrganisationsList)
      } catch (error) {
        setErrors(error)
      }
      
    }
    // Promise allows to run 2 functions in parallel
    Promise.all([
        fetchOrganisations(),
        ])
    },[]);

    //method

    const handleDropDownOrganisation = (dataValue) => {
        setCredentials({...credentials,
          region: dataValue})
      }
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
        <div className="medium-form">
            <form >
                <p className="message">*This form is only for organisation wanting to post opportunities. You don't need an account to view listings.*</p>
                <p></p>
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
                        id="email" placeholder="Enter a work email" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" placeholder="Enter a secure password" 
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="organisation">Organisation:</label>
                <Dropdown
                    title="Select an organisation"
                    data={organisations}
                    handleDropDown={handleDropDownOrganisation}
                    value={credentials.organisation} 
                />
                <p></p>

                <button type="submit" onClick={handleSubmit}>Register</button>
                {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
                
                <p className="message">Already registered?</p>
                <Link to="/login">Login</Link>

            </form>
        </div>
    )
}

export default RegisterForm;
