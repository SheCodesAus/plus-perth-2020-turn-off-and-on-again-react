import React, {useState, useEffect} from "react";
import ReactLoading from "react-loading";
import ContactUsForm from "../components/ContactUsForm/ContactUsForm";
import OpportunityCard from "../components/OpportunityCard/OpportunityCard";

function AboutPage() {
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

        // templates 
    return (
    <div>
        <div className="mainContent">
            <h1> About Tech For Me </h1>
            <p>A directory of incentivised learning opportunities to connect providers with women and diverse technology enthusiasts.</p>
            <p>If you're here on behalf of an organisation, you can post opportunities to the directory to help enable diversity in tech.</p>
            <h2> Latest Opportunities </h2>
            <div id="opportunity-list" > 
                {opportunityList.map((opportunityData, key) => {
                return <OpportunityCard key = {key}
                opportunityData = {opportunityData}
                />;
                })
            }
            </div> 
        </div>
        <div id="">
        <ContactUsForm />
        </div>
    </div>
    );
}

export default AboutPage;