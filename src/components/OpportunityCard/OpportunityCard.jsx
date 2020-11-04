<<<<<<< Updated upstream
import React from "react";
import { Link } from "react-router-dom";
import "./ListingCard.css";

function ListingCard(props) {
    //variables
    const { listingData } = props;

    //template
    return (
        <div className="listing-card">
            <Link to={`/case/${listingData.id}`}>
                <img src={listingData.image} />
                <h3>{listingData.title}</h3>
            </Link>
        </div>
    );
}

export default ListingCard;
=======
import React from "react"
import { Link } from "react-router-dom"

function OpportunityCard(props) {
  const { listingData } = props
  return (
    <div className="listing-card">
      <Link to={`/case/${listingData.slug}`}>
        <img src={listingData.image} alt="opportunity" />
        <h2>{listingData.title}</h2>
        <h3>{listingData.start_date}</h3>
        <h3>{listingData.organisation}</h3>
        <h3>{listingData.is_open}</h3>
        <h3>{listingData.website}</h3>
        <h3>{listingData.description}</h3>
        <h3>{listingData.apply_by_date}</h3>
        <h3>{listingData.datecreated}</h3>

        <p>Created by{listingData.user}</p>
      </Link>
    </div>
  )
}

export default OpportunityCard
>>>>>>> Stashed changes
