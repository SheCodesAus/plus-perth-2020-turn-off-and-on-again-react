import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({opportunityData, category, ...props}) {
console.log(opportunityData)
return (
<div className="category-card">
    
    <Link to={`/opportunities/?${category}=${opportunityData.slug}`}>
        {opportunityData.image ? <img src={opportunityData.image} alt={`${opportunityData.name}`}/> :<></>}
        <p>See all the {opportunityData.name} opportunities</p>
    </Link>
</div>
);
}

export default CategoryCard