import React, { useState } from "react";
import { useHistory } from "react-router-dom"

function OrganisationForm() {
    //variables 
    const [organisation, setOrganisation] = useState({});
    const history = useHistory();
    const token = window.localStorage.getItem("token")
    const id = window.localStorage.getItem("id")


    const postData = async() => {
        try{
            let form_data = new FormData();
            form_data.append('logo', organisation.logo);
            form_data.append('description', organisation.description);
            form_data.append('website', organisation.website);
            form_data.append('organisation', organisation.organisation);
            
            const response = await fetch
            (`${process.env.REACT_APP_API_URL}organisations/`, 
            {
                method: "post",
                headers: {
                    Authorization: `token ${token}`,
                },
                body: form_data,
            }
            );
            const data = await response.json() 

            const org = organisation.organisation
            await fetch
            (`${process.env.REACT_APP_API_URL}users/${id}`, 
            {
                method: "put",
                headers: {
                    Authorization: `token ${token}`,
                },
                body: org ,
            }
            );
            window.localStorage.setItem("organisation", data.organisation)
        if ( organisation.organisation && organisation.description  && organisation.website  && organisation.logo !== undefined ) {
            
            history.push("/");
            return data
        } else {
            alert("Give us more details, all fields are required :)")
        }
    }catch (error) {
        alert("Network error", error.message)
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(organisation)
    await postData(token)
}
//method
const handleChange = (e) => {
    const {id, value} = e.target;
    setOrganisation((prevOrganisation) => ({
        ...prevOrganisation,
        [id]: value,
    }))
}
const handleChangeImage = (e) => {
    e.persist();
    setOrganisation((prevOrganisation) => ({
        ...prevOrganisation,
        logo: e.target.files[0],
    }));
};

    //template
    return (
        <div className="medium-form">
            <form >
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
                        rows="4"
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
                        type="file"
                        id="logo"
                        placeholder="Logo"
                        onChange={handleChangeImage}
                        accept="image/*"
                    />
                </div>

                <button type="submit" onClick={handleSubmit}>Register New Organisation</button>
            </form>
        </div>
    )
}

export default OrganisationForm;
