import React,{useEffect,useState} from "react"
import {useParams} from "react-router-dom"
import ReactLoading from "react-loading";

import OpportunityCard from "../components/OpportunityCard/OpportunityCard";

function OpportunityListPage() {
    // variables
    const [opportunityList, setOpportunityList] = useState({
        loading: true
    });
    const { typeList } = useParams()

    // methods: useEffect render when the app render, the bracket while have the condition for the useEffect to rerender when app change
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}listing/`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setOpportunityList(data);
            });
    }, [opportunityList]);

    if (opportunityList.loading) {
        return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
    }

    // template
    return ( 
        <div>
            <div className="project-header">
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
