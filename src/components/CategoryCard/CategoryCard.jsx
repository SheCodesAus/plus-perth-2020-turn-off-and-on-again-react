import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({opportunityData, ...props}) {
console.log(opportunityData)
return (
<div className="event-card">
    
    <Link to={`/opportunities?category=${opportunityData.slug}`}>
        <img src={opportunityData.name} alt={`${opportunityData.name}`}/>
        <h3>See all the {opportunityData.name} opportunities</h3>
    </Link>
</div>
);
}

export default CategoryCard