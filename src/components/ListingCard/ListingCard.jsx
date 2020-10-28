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