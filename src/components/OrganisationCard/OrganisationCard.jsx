import React from "react"
import { Link } from "react-router-dom"

import "./OrganisationCard.css"

function OrganisationCard({ organisationData, ...props }) {
  return (
    <div className="listing-card">
      <Link to={`/organisations/${organisationData.id}`}>
        <img src={organisationData.logo} alt={organisationData.title} />
        <h2>{organisationData.organisation}</h2>
        <p>{organisationData.website}</p>
        <p>
          {organisationData.description.split(" ").splice(0, 20).join(" ")}...
        </p>
      </Link>
    </div>
  )
}

export default OrganisationCard
