import EditOrganisationForm from "../components/EditOrganisationForm/EditOrganisationForm"
import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";


function EditOrganisationPage() {
    const [organisationData, setProfileData] = useState({ });
    const { slug } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}organisations/${slug}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setProfileData(data);
        });
    }, [slug]);

    return <EditOrganisationForm organisationData={organisationData} />;
}

export default EditOrganisationPage;