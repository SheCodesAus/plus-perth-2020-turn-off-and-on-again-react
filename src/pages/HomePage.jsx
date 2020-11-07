import React,{useEffect,useState} from "react"
import ReactLoading from "react-loading"

import CategoryCard from "../components/CategoryCard/CategoryCard"
import {Link} from "react-router-dom"

import banner from '../images/ready-to-study.jpg'

function HomePage({loggedIn}) {

    const [typeList, setTypeList] = useState([])
    const [locationList, setLocationList] = useState([])
    const [audienceList, setAudienceList] = useState([])
    const [levelList, setLevelList] = useState([])
    const [isLoading, setIsLoading] = useState (true)
    const [hasError, setErrors] = useState(false)

    
    useEffect(() => {
        async function fetchTypes() {
            try {
                const r = await fetch(`${process.env.REACT_APP_API_URL}types/`);
                const type = await r.json()
                setTypeList(type)
            } catch (error) {
                setErrors(error)
            }
        }
        async function fetchLocations() {
            try {
                const r = await fetch(`${process.env.REACT_APP_API_URL}locations/`);
                const locations = await r.json()
                setLocationList(locations)
            } catch (error) {
                setErrors(error)
            }
        }
        async function fetchAudiences() {
            try {
                const r = await fetch(`${process.env.REACT_APP_API_URL}audiences/`);
                const audiences = await r.json()
                setAudienceList(audiences)
            } catch (error) {
                setErrors(error)
            }
        }
        async function fetchLevels() {
        try {
            const r = await fetch(`${process.env.REACT_APP_API_URL}levels/`);
            const levels = await r.json()
            setLevelList(levels)
        } catch (error) {
            setErrors(error)
        }
        }
        // Promise allows to run multiple functions in parallel
        Promise.all([
            fetchTypes(),
            fetchLocations(),
            fetchAudiences(),
            fetchLevels()
        ]).then(() => setIsLoading(false))
    },[]);
    

        
    if ( isLoading) {
        return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
    } 
    console.log(typeList)

    return ( 
        <div>
            {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
            <div className="banner">
            <img src={banner} alt="Banner"/>
            <div className="bannerText">
                {loggedIn?
                <Link to="/opportunities/create">
                    <button>Create a new opportunity</button>
                </Link>
                : <><h2>Looking for opportunity to start your journey in Tech?</h2>
                <p>TechForMe is a place where you can find a sponsorship, an internship, a discount, an event in Tech related to your criterias and needs.</p></>}
            </div>
            </div>
            <div className="project-header">
                <h1> This is the HomePage </h1> 
                <div className="categoryCards"> 
                    <div >
                        <h2>Find an opportunity type:</h2>
                        <div id="opportunity-list" > 
                                {typeList.map((opportunityData, key) => {
                                    return <CategoryCard 
                                    key={key} 
                                    opportunityData={opportunityData} 
                                    />
                                })}
                        </div> 
                    </div>
                    <div >
                        <h2>Find an opportunity type:</h2>
                        <div id="opportunity-list" > 
                                {locationList.map((opportunityData, key) => {
                                    return <CategoryCard 
                                    key={key} 
                                    opportunityData={opportunityData} 
                                    />
                                })}
                        </div> 
                    </div>
                    <div >
                        <h2>Find an opportunity type:</h2>
                        <div id="opportunity-list" > 
                                {audienceList.map((opportunityData, key) => {
                                    return <CategoryCard 
                                    key={key} 
                                    opportunityData={opportunityData} 
                                    />
                                })}
                        </div> 
                    </div>
                    <div >
                        <h2>Find an opportunity type:</h2>
                        <div id="opportunity-list" > 
                                {levelList.map((opportunityData, key) => {
                                    return <CategoryCard 
                                    key={key} 
                                    opportunityData={opportunityData} 
                                    />
                                })}
                        </div> 
                    </div>
                </div> 
            </div>
            <div className="footer">This is a footer</div>
        </div>
    );
}

export default HomePage;