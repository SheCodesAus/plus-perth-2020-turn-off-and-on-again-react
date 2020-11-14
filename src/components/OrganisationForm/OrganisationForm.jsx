import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { getStorage, isAuthenticated } from "../Utilities/LocalStorage"

function OrganisationForm() {
    //variables 
    const [organisation, setOrganisation] = useState({
        organisation: "",
        description: "",
        website: "",
        logo: ""
    });
    const history = useHistory();
  

    //method
    const handleChange = (e) => {
        const {id, value} = e.target;
        setOrganisation((prevOrganisation) => ({
            ...prevOrganisation,
            [id]: value,
        }))
    }
    const postData = async() => {
        const response = await fetch
        (`${process.env.REACT_APP_API_URL}organisations/`, 
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${getStorage("token")}`
            },
            body: JSON.stringify(organisation),
        }
        );
        return response.json();
    }

    const handleSubmit = (e) => {
        console.log(organisation)
        e.preventDefault();
        console.log("token");


        if(organisation.organisation && 
            organisation.description && 
            organisation.website && 
            organisation.logo) {
         postData().then((response) => {
            if (isAuthenticated()){
                history.push("/register");
            }
            });
        }
    }


    //template
    return (
        <div className="medium-form">
            <form>
                <div>
                    <label htmlFor="organisation">Organisation:</label>
                    <input 
                        type="text" 
                        id="organisation" 
                        placeholder="Enter organisation name" 
                        onChange={handleChange}
                    />
                </div>
                <div className="textarea">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        type="text" 
                        id="description" placeholder="Enter short description" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="website">Website:</label>
                    <input 
                        type="text" 
                        id="website" placeholder="Enter a URL to the organisation homepage" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="logo">Logo:</label>
                    <input 
                        type="text" 
                        id="logo" placeholder="Enter a URL to an logo to use as thumbnail" 
                        onChange={handleChange}
                    />
                </div>


                <button type="submit" onClick={handleSubmit}>Register New Organisation</button>
            </form>
        </div>
    )
}

export default OrganisationForm;
