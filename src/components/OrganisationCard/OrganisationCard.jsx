import React from "react"
import { Link } from "react-router-dom"

import "./OrganisationCard.css"

function OrganisationCard({ organisationData, ...props }) {
  return (
    <div className="listing-card">
      <Link to={`/organisations/${organisationData.slug}`}>
        <img src={organisationData.logo} alt="organisation-overview" />
        <h2>{organisationData.organisation}</h2>
        {/* <p>{organisationData.website}</p> */}
        <p>{organisationData.description}</p>
        {/* <p>Created by {organisationData.owner}</p> */}
      </Link>
    </div>
  )
}

export default OrganisationCard