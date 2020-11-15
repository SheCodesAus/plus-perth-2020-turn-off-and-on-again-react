import React,{useEffect,useState} from "react"
import {useLocation} from "react-router-dom"
import ReactLoading from "react-loading";

import OpportunityCard from "../components/OpportunityCard/OpportunityCard";

function OpportunityListPage() {
    // variables
    const [opportunityList, setOpportunityList] = useState({
        loading: true
    });
    const location = useLocation()
    const opportunityName = location.search.substr(1).split('=')[1]

    // methods: useEffect render when the app render, the bracket while have the condition for the useEffect to rerender when app change
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}listing/` + location.search)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setOpportunityList(data);
            });
    }, [location.search]);

    if (opportunityList.loading) {
        return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
    }

    return ( 
        <div>
            <div className="mainContent">
                <h1> This is the Opportunity Page </h1> 
                <div id="opportunity-list" > 
                    {opportunityList.map((opportunityData, key) => {
                        return <OpportunityCard key={key} opportunityData={opportunityData}/>;
                        })
                    } 
                </div> 
            </div>
        </div>
    );
}

export default OpportunityListPage
