import React from "react";
import OrganisationForm from "../components/OrganisationForm/OrganisationForm"

function NewOrganisationPage() {
    return ( 
        <div className="mainContent">
            <h1>Create your organisation</h1>
            <div> 
            <OrganisationForm/>
            </div> 
        </div>
      );
}

export default NewOrganisationPage;