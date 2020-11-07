import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { getStorage, isAuthenticated } from "../Utilities/LocalStorage"

function EditOrganisationForm(props) {
    //variables 
    const {profileData} = props;

    const [profile, setProfile] = useState({
        organisation: "",
        description: "",
        website: "",
        logo: ""
    });
    const history = useHistory();
    const{id}=useParams();

    useEffect(() => {
        if (profileData.title == null) return
        console.log({profileData})
        setProfile(
            {
                organisation: profileData.organisation,
                description: profileData.description,
                website: profileData.website,
                image: profileData.logo,
            }
        )
    }, [profileData])

    //method
    const handleChange = (e) => {
        const {id, value} = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [id]: value,
        }))
    }
    const postData = async() => {
        const response = await fetch
        (`${process.env.REACT_APP_API_URL}profile/${id}`, 
        {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${getStorage("token")}`
            },
            body: JSON.stringify(profile),
        }
        );
        return response.json();
    }

    const handleSubmit = (e) => {
 
        e.preventDefault();

         postData().then((response) => {
            if (isAuthenticated()){
                history.push(`/opportunities/${id}`);
            } 
            });
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
                        value={profile.organisation}
                        onChange={handleChange}
                    />
                </div>
                <div className="textarea">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        type="text" 
                        id="description" 
                        value={profile.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="website">Website:</label>
                    <input 
                        type="text" 
                        id="website" 
                        value={profile.website}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="logo">Logo:</label>
                    <input 
                        type="text" 
                        id="logo" 
                        value={profile.logo}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Update Profile</button>
            </form>
        </div>
    )
}

export default EditOrganisationForm;