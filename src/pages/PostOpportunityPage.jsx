import React from "react"
import PostOpportunityForm from "../components/PostOpportunityForm/PostOpportunityForm"

function PostOpportunityPage() {
  return ( 
    <div className="mainContent">
        <h1>Post a new opportunity</h1>
        <div> 
            <PostOpportunityForm/>
        </div> 
    </div>
  );
}

export default PostOpportunityPage
