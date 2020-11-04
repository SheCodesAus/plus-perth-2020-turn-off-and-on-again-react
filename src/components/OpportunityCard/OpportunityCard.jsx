import React from "react"
import { Link } from "react-router-dom"

import "./OpportunityCard.css"

function OpportunityCard({ opportunityData, ...props }) {
  return (
    <div className="listing-card">
      <Link to={`/case/${opportunityData.slug}`}>
        <img src={opportunityData.image} alt="opportunity" />
        <h3>{opportunityData.title}</h3>
        <h3>{opportunityData.start_date}</h3>
        <h3>{opportunityData.organisation}</h3>
        <h3>{opportunityData.is_open}</h3>
        <h3>{opportunityData.website}</h3>
        <h3>{opportunityData.description}</h3>
        <h3>{opportunityData.apply_by_date}</h3>
        <h3>{opportunityData.datecreated}</h3>
        <p>Created by {opportunityData.owner}</p>
      </Link>
    </div>
  )
}

export default OpportunityCard
