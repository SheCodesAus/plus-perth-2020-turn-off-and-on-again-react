import EditOrganisationForm from "../components/EditOrganisationForm/EditOrganisationForm"
import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";


function EditOrganisationPage() {
    const [profileData, setProfileData] = useState({ });
    const { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}profile/${id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setProfileData(data);
        });
    }, [id]);

    return <EditOrganisationForm profileData={profileData} />;
}

export default EditOrganisationPage;