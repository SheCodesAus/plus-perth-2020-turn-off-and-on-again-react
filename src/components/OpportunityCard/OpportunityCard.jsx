import React from "react"
import { Link } from "react-router-dom"

import "./OpportunityCard.css"

function OpportunityCard({ opportunityData, ...props }) {
  return (
    <div className="listing-card">
      <Link to={`/opportunities/${opportunityData.id}`}>
        <img src={opportunityData.image} alt={opportunityData.title} />
        <h2>{opportunityData.title}</h2>
        <h2>{opportunityData.website}</h2>
        <p>{ opportunityData.description.split(" ").splice(0,20).join(" ")}...</p>
      </Link>
    </div>
  )
}

export default OpportunityCard

// Still need to limit listings to the related category and that the listing is open. 