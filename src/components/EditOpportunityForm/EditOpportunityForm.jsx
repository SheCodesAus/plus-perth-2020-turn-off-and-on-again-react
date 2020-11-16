import React, { useState, useEffect } from "react"
import { useParams, useHistory} from "react-router-dom"

function EditOpportunityForm() {
  //variables

  const [opportunityData, setopportunityData] = useState({
    title: "",
    image: "",
    description: "",
    start_date: "",
    apply_by_date: "",
    link: "",
    eligibility: "",
    owner: "",
    typeList: [],
    location: [],
    level: [],
    audience: [],
    organisation: ""
  })

  const { id } = useParams()
  const [ , setaudienceData] = useState([])
  const [ , setlevelData] = useState([])
  const [ , settypeListData] = useState([])
  const [ , setlocationData] = useState([])

  const history = useHistory()
  const token = window.localStorage.getItem("token")

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

  const handleChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target
    setopportunityData((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
const handleChangeImage = (e) => {
  e.persist();
  setopportunityData((prevCredentials) => ({
    ...prevCredentials,
    image: e.target.files[0],
  }));
};

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}audiences/`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setaudienceData(data)
      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}levels/`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setlevelData(data)
      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}types/`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        settypeListData(data)
      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}locations/`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setlocationData(data)
      })
  }, [])

  const postData = async () => {

    var targetUrl = `${process.env.REACT_APP_API_URL}listing/${id}`,
        proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    
    const response = await fetch(
      (proxyUrl + targetUrl),
      {
        method: "put",
        headers: {
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({
          image: opportunityData.image,
          title: opportunityData.title,
          description: opportunityData.description,
          date_created: opportunityData.date_created,
          start_date: opportunityData.start_date,
          apply_by_date: opportunityData.apply_by_date,
          link: opportunityData.link,
          eligibility: opportunityData.eligibility,
          owner: opportunityData.owner,
          typeList: opportunityData.typeList,
          location: opportunityData.location,
          level: opportunityData.level,
          audience: opportunityData.audience,
          organisation: opportunityData.organisation
        }),
      }
    )
    return response.json()
  }

  const handleSubmit = (e) => {
    
    e.preventDefault()
    if (true) {
      postData()
        .then((response) => {
          history.push(`/opportunities/${id}`)
          // console.log(response);
        })
        .catch((error) => {
          alert("There is an error in your request")
        })
    }
  }

  //template
  return (
    <div className="medium-form">
    <form >
        <div>
          <label htmlFor="image">Upload your image:</label>
          <img src={opportunityData.image} alt={`${opportunityData.title}`}/>
          <input
            type="file"
            id="image"
            placeholder="image"
            onChange={handleChangeImage}
            accept="image/*"
          />
        </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Edit Opportunity Title"
          value={opportunityData.title}
          onChange={handleChange}
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
          value={opportunityData.start_date.substr(0, 10)}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="audience">Audience:</label>
        <input
          type="checkbox"
          id="audience"
          value={opportunityData.audience}
          onChange={handleChange}

        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="checkbox"
          id="level"
          onChange={handleChange}
          value={opportunityData.level}
        />
      </div>
      <div>
        <label htmlFor="typeList">Type:</label>
        <input
          type="checkbox"
          id="typeList"
          onChange={handleChange}
          value={opportunityData.typeList}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="checkbox"
          id="location"
          onChange={handleChange}
          value={opportunityData.location}
        />
      </div>
      <div>
        <label htmlFor="link">Website:</label>
        <input
          type="text"
          id="link"
          placeholder="Edit opportunity link"
          onChange={handleChange}
          value={opportunityData.link}
        />
      </div>
      <div>
        <label htmlFor="eligibility">Eligibility:</label>
        <input
          type="text"
          id="eligibility"
          placeholder="Edit eligibility requirements"
          onChange={handleChange}
          value={opportunityData.eligibility}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Edit description"
          value={opportunityData.description}
          onChange={handleChange}
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
          value={opportunityData.apply_by_date.substr(0, 10)}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
    </div>
  )
}

export default EditOpportunityForm
