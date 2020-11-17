import React, { useState, useEffect } from "react"
import { useParams, useHistory} from "react-router-dom"
import ReactLoading from "react-loading"
import Checkbox from "../Checkbox/Checkbox"

function EditOpportunityForm() {
  //variables

  const today = new Date()
  const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [opportunityData, setopportunityData] = useState({date_created: todayDate})

  const history = useHistory()
  const token = window.localStorage.getItem("token")
  const { id } = useParams()
  const [typeList, setTypeList] = useState([])
  const [locationList, setLocationList] = useState([])
  const [audienceList, setAudienceList] = useState([])
  const [levelList, setLevelList] = useState([])
  const [isLoading, setIsLoading] = useState (true)
  const [hasError, setErrors] = useState(false)

  //methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}listing/${id}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setopportunityData(data)
      })
  }, [id])
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
    let form_data = new FormData();
    form_data.append('title', opportunityData.title);
    form_data.append('description', opportunityData.description);
    form_data.append('start_date', opportunityData.start_date);
    form_data.append('apply_by_date', opportunityData.apply_by_date);
    form_data.append('link', opportunityData.link);
    form_data.append('eligibility', opportunityData.eligibility);
    opportunityData.typeList.forEach(t => form_data.append('typeList', t))
    opportunityData.location.forEach(t => form_data.append('location', t))
    opportunityData.level.forEach(t => form_data.append('level', t))
    opportunityData.audience.forEach(t => form_data.append('audience', t))

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}listing/${id}`,
      {
        method: "put",
        headers: {
          Authorization: `token ${token}`,
        },
        body: form_data,
      }
    )
    return response.json()
    }
    //methods
    const handleSubmit = (e) => {
    e.preventDefault();
    postData()
      .then((response) => {
        history.push(`/listing/${id}`)
    })
    .catch((error) => {
      alert("you have not completed the form")
    })

    };

    const handleChange = (e) => {
    const { id, value } = e.target
    setopportunityData((prevopportunityData) => ({
      ...prevopportunityData,
      [id]: value,
    }))
    }
    // const handleChangeImage = (e) => {
    // e.persist();
    // setopportunityData((prevopportunityData) => ({
    // ...prevopportunityData,
    // image: e.target.files[0],
    // }));
    // };

    const handleCheckbox = ({name, stateKey, checked}) => {
    let nextValue = [...opportunityData[stateKey]]
    if (checked){
    nextValue.push(name) 
    } else {
    nextValue = nextValue.filter(item => item !== name)
    }
    setopportunityData({
    ...opportunityData, 
    [stateKey]: nextValue
    })
  }
  if ( isLoading) {
    return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
} 
  //template
  return (

    <form>
    {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
      <div className="medium-form">
        <label htmlFor="title">Change the Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Opportunity Title"
          onChange={handleChange}
          value={opportunityData.title}
        />
      </div>
      {/* <div>
        <img src={opportunityData.image} alt={`${opportunityData.title}`}/>
          <label htmlFor="image">Upload a new image:</label>        <input
          type="file"
          id="image"
          placeholder="Image"
          onChange={handleChangeImage}
          accept="image/*"
        />
      </div> */}
      <div>
        <label htmlFor="start_date">This opportunity starts on:</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          onChange={handleChange}
          value={opportunityData.start_date}
          placeholder="Choose a date"
        />
      </div>
      <div>
        <label htmlFor="audiences">Update an audience:</label>
        <br/>    
        <div className="checkList">
        {audienceList.map((listData, key) => {
              return <Checkbox formData={opportunityData} formKey={"audience"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </div>
      </div>
      <div>
        <label htmlFor="locations">Update a location:</label>
        <br/>    
        <div className="checkList">
        {locationList.map((listData, key) => {
          return <Checkbox formData={opportunityData} formKey={"location"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </div>
      </div>
      <div>
        <label htmlFor="types">Update a type:</label>
        <br/>    
        <div className="checkList">
        {typeList.map((listData, key) => {
          return <Checkbox formData={opportunityData} formKey={"typeList"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </div>
      </div>
      <div>
        <label htmlFor="levels">Update a level:</label>
        <br/>    
        <div className="checkList">
        {levelList.map((listData, key) => {
          return <Checkbox formData={opportunityData} formKey={"level"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </div>
      </div>
      <div>
        <label htmlFor="weblink">Update the link to this opportunity:</label>
        <input
          type="url"
          id="weblink"
          placeholder="Enter website link"
          onChange={handleChange}
          value={opportunityData.link}
        />
      </div>
      <div>
        <label htmlFor="eligibility">Eligibility:</label>
        <input
          type="text"
          id="eligibility"
          placeholder="Enter eligibility requirements"
          onChange={handleChange}
          value={opportunityData.eligibility}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          placeholder="Description"
          onChange={handleChange}
          value={opportunityData.description}
          rows="10"
        />
      </div>
      <div>
        <label htmlFor="apply_by_date">Application to validate before:</label>
        <input
          type="date"
          id="apply_by_date"
          name="apply_by_date"
          min="2020-01-01"
          max="2021-12-31"
          placeholder="Choose a date"
          onChange={handleChange}
          value={opportunityData.apply_by_date}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Update this Opportunity
      </button>
    </form>
  )
}

export default EditOpportunityForm
