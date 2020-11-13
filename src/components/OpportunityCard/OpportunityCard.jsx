import React from "react"
import { Link } from "react-router-dom"

import "./OpportunityCard.css"

function OpportunityCard({ opportunityData, ...props }) {
  return (
    <div className="listing-card">
      <Link to={`/opportunities/${opportunityData.id}`}>
        <img src={opportunityData.image} alt={opportunityData.title} />
        <h3>{opportunityData.title}</h3>
        <h3>{opportunityData.start_date}</h3>
        <h2>{opportunityData.organisation}</h2>
        <h3>{opportunityData.is_open}</h3>
        <h2>{opportunityData.website}</h2>
        <h4>{opportunityData.description}</h4>
        <h4>{opportunityData.apply_by_date}</h4>
        <h5>{opportunityData.datecreated}</h5>
        <p>Created by {opportunityData.user}</p>
      </Link>
    </div>
  )
}

export default OpportunityCard
