import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ReactLoading from "react-loading"


function PostOpportunityForm() {
  //variables
  const [credentials, setCredentials] = useState({
    title: "test",
    image: "test",
    start_date: "test",
    organisation: "shecodes",
    audience: ["women"],
    level: ["beginner"],
    typeList: ["free"],
    location: ["perth"],
    website: "https://shecodes.com",
    eligibility: "none",
    description: "none",
    apply_by_date: "2020-09-09T20:31:00Z",
    date_created: "2020-09-09T20:31:00Z",
    owner: "aws",
  })

  const history = useHistory()
  const token = window.localStorage.getItem("token")

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

  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}OpportunityListPage/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    )
    return response.json()
  }
  //methods
  const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (true) {
      postData()
        .then((response) => {
          history.push("/")
          // console.log(response);
        })
        .catch((error) => {
          alert("you have not completed the form")
        })
    }
  }
        
  if ( isLoading) {
    return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
} 
  //template
  return (
    <form>
    {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
      <div>
        <label htmlFor="image">Upload your image:</label>
        <input
          type="file"
          id="image"
          placeholder="Image"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Opportunity Title"
          onChange={handleChange}
          value={credentials.title}
        />
      </div>
      <div>
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={credentials.start_date}
        />
      </div>
      <div>
        <label htmlFor="organisation">Organisation:</label>
        <input
          type="text"
          id="organisation"
          placeholder="Enter Organisation Name"
          onChange={handleChange}
          value={credentials.organisation}
        />
      </div>
      <div>
      {audienceList.map((audienceData, key) => {
              return <button>Test</button>
                                })}
        <label htmlFor="audience">Audience:</label>
        <input
          type="checkbox"
          id="audience"
          placeholder="is_open"
          onChange={handleChange}
          value={credentials.is_open}
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="checkbox"
          id="level"
          placeholder="is_open"
          onChange={handleChange}
          value={credentials.is_open}
        />
      </div>
      <div>
        <label htmlFor="typeList">Type:</label>
        <input
          type="checkbox"
          id="typeList"
          placeholder="is_open"
          onChange={handleChange}
          value={credentials.is_open}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="checkbox"
          id="location"
          placeholder="is_open"
          onChange={handleChange}
          value={credentials.location}
        />
      </div>
      <div>
        <label htmlFor="website">Website:</label>
        <input
          type="text"
          id="website"
          placeholder="Enter website link"
          onChange={handleChange}
          value={credentials.website}
        />
      </div>
      <div>
        <label htmlFor="eligibility">Eligibility:</label>
        <input
          type="text"
          id="eligibility"
          placeholder="Enter eligibility requirements"
          onChange={handleChange}
          value={credentials.eligibility}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          onChange={handleChange}
          value={credentials.description}
        />
      </div>
      <div>
        <label htmlFor="apply_by_date">Apply by Date:</label>
        <input
          type="date"
          id="apply_by_date"
          name="apply_by_date"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={credentials.apply_by_date}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Create Opportunity
      </button>
    </form>
  )
}

export default PostOpportunityForm
