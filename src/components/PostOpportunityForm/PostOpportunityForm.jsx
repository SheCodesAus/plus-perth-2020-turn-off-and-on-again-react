import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ReactLoading from "react-loading"


function PostOpportunityForm() {

  //variables
  const [credentials, setCredentials] = useState({
      title: "Test",
      description: "Learn the fundamentals of coding while creating a web page with this easy to follow, step by step online course. This course will help you understand the introductory concepts of web development and give some insight into work involved in creating a website.\r\n\r\nYou will work on building your basic page at the end of the course.\r\n\r\nThe videos are short, explaining one concept at a time, making it easy to follow along.\r\n\r\nSo jump right in and get started!",
      date_created:(new Date()),
      start_date: (new Date()),
      apply_by_date: (new Date()),
      link: "https://learn.codemasterinstitute.com/course/coding-101-website-development/",
      eligibility: "",
      owner: "",
      typeList: [
          "free"
      ],
      location: [
          "online"
      ],
      level: [
          "beginner"
      ],
      audience: [
          "financial-aid"
      ],
      organisation: "Codemaster Institute"
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
    let form_data = new FormData();
    form_data.append('image', credentials.image);
    form_data.append('title', credentials.title);
    form_data.append('description', credentials.description);
    form_data.append('date_created', credentials.date_created);
    form_data.append('start_date', credentials.start_date);
    form_data.append('apply_by_date', credentials.apply_by_date);
    form_data.append('link', credentials.link);
    form_data.append('eligibility', credentials.eligibility);
    form_data.append('owner', credentials.owner);
    form_data.append('typeList', credentials.typeList);
    form_data.append('location', credentials.location);
    form_data.append('level', credentials.level);
    form_data.append('audience', credentials.audience);
    form_data.append('organisation', credentials.organisation);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}listing/`,
      {
        method: "post",
        headers: {
          Authorization: `token ${token}`,
        },
        body: form_data,
      }
    )
    return response.json()
  }
  //methods
const  handleSubmit = (e) => {
  
    e.preventDefault();
    postData()
      .then((response) => {
        // history.push("/")
        // console.log(response);
  
    })
    .catch((error) => {
      alert("you have not completed the form")
    })
  
  };

const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
    console.log(e.target)
  }
const handleChangeImage = (e) => {
  e.persist();
  setCredentials((prevCredentials) => ({
    ...prevCredentials,
    image: e.target.files[0],
  }));
};
        
  if ( isLoading) {
    return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
} 
  //template
  return (
    <form>
    {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
      
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
        <label htmlFor="image">Upload your image:</label>
        <input
          type="file"
          id="image"
          placeholder="Image"
          onChange={handleChangeImage}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
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
        <label htmlFor="audiences">Choose an audience:</label>
        <br/>    
        <div class="checkList">
        {audienceList.map((listData, key) => {
              return (
                <>
                <input
                type="checkbox"
                key={key} 
                id={listData.slug}
                label={listData.slug}
                value={listData.slug}/>
                <label htmlFor={listData.slug}>{listData.name}</label>
              </>)})}
        </div>
      </div>
      <div>
        <label htmlFor="locations">Choose a location:</label>
        <br/>    
        <div class="checkList">
        {locationList.map((listData, key) => {
              return (
                <>
                <input
                type="checkbox"
                key={key} 
                id={listData.slug}
                label={listData.slug}
                value={listData.slug}/>
                <label htmlFor={listData.slug}>{listData.name}</label>
              </>)})}
        </div>
      </div>
      <div>
        <label htmlFor="types">Choose a type:</label>
        <br/>    
        <div class="checkList">
        {typeList.map((listData, key) => {
              return (
                <>
                <input
                type="checkbox"
                key={key} 
                id={listData.slug}
                label={listData.slug}
                value={listData.slug}/>
                <label htmlFor={listData.slug}>{listData.name}</label>
              </>)})}
        </div>
      </div>
      <div>
        <label htmlFor="levels">Choose a level:</label>
        <br/>    
        <div class="checkList">
        {levelList.map((listData, key) => {
              return (
                <>
                <input
                type="checkbox"
                key={key} 
                id={listData.slug}
                label={listData.slug}
                value={listData.slug}/>
                <label htmlFor={listData.slug}>{listData.name}</label>
              </>)})}
        </div>
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
