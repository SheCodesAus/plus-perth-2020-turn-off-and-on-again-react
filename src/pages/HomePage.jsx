import React, {useState, useEffect} from "react";
import ReactLoading from "react-loading";
// import { allEvents } from "../data";

import OpportunityCard from "../components/OpportunityCard/OpportunityCard";
import banner from '../images/ready-to-study.jpg'

function HomePage() {
    // variables
    const [opportunityList, setOpportunityList] = useState({
        loading: true
    });

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
            <img src={banner} alt="Banner"/>
            <div className="project-header">
                <h1> This is the HomePage </h1> 
                <div id="opportunity-list" > 
                    {opportunityList.map((opportunityData, key) => {
                    return <OpportunityCard key = {key}
                    opportunityData = {opportunityData}
                    />;
                    })
                } 
                </div> 
            </div>
        </div>
    );
}

export default HomePage;