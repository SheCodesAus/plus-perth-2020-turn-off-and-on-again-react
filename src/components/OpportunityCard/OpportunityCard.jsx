import React from "react";
import { Link } from "react-router-dom";
import "./ListingCard.css";

function ListingCard({opportunityData, ...props}) {

    return (
        <div className="listing-card">
            <Link to={`/case/${opportunityData.slug}`}>
                <img src={opportunityData.image} alt="ooportunity"/>
                <h3>{opportunityData.title}</h3>
                <p>Created by{opportunityData.owner}</p>
            </Link>
        </div>
    );
}

export default ListingCard;