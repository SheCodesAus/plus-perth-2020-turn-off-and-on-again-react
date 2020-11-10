import React from "react"
import { Link } from "react-router-dom"

import "./OrganisationCard.css"

function OrganisationCard({ organisationData, ...props }) {
  return (
    <div className="listing-card">
      <Link to={`/organisations/${organisationData.id}`}>
        <img src={organisationData.logo} />
        <h3>{organisationData.organisation}</h3>
        <h3>{organisationData.is_open}</h3>
        <h3>{organisationData.website}</h3>
        <h3>{organisationData.description}</h3>
        <h3>{organisationData.date_created}</h3>
        <p>Created by {organisationData.user}</p>
      </Link>
    </div>
  )
}

export default OrganisationCard
