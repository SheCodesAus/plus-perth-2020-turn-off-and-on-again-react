import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

function EditOpportunityForm() {
  //variables
  const [opportunityData, setopportunityData] = useState({
    id: "",
    title: "",
    image: "",
    start_date: "",
    organisation: "",
    audience: "",
    level: "",
    typeList: "",
    location: "",
    website: "",
    eligibility: "",
    description: "",
    apply_by_date: "",
    date_created: "2020-09-09T20:31:00Z",
    owner: "",
  })

  const { id } = useParams()
  const [audienceData, setaudienceData] = useState([])
  const [levelData, setlevelData] = useState([])
  const [typeListData, settypeListData] = useState([])
  const [locationData, setlocationData] = useState([])

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
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setopportunityData((data) => ({
      ...data,
      [id]: value,
    }))
  }

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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}listing/${id}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
          "Content-Disposition": `attachment; filename="${opportunityData.image}"`,
        },
        body: JSON.stringify({
          title: opportunityData.title,
          start_date: opportunityData.start_date,
          audience: opportunityData.audience,
          level: opportunityData.level,
          typeList: opportunityData.type,
          location: opportunityData.location,
          website: opportunityData.website,
          description: opportunityData.description,
          apply_by_date: opportunityData.apply_by_date,
          image: opportunityData.image,
          is_open: opportunityData.is_open,
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
    <form className="medium-form">
      <div>
        <label htmlFor="image">Upload your image:</label>
        <img src={opportunityData.image} alt={`${opportunityData.title}`} />
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
          placeholder="Edit Opportunity Title"
          onChange={handleChange}
          value={opportunityData.title}
        />
      </div>
      <div>
        <label for="start_date">Start Date:</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={opportunityData.start_date}
        />
      </div>
      <div>
        <label htmlFor="audience">Audience:</label>
        <input
          type="checkbox"
          id="audience"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="checkbox"
          id="level"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="typeList">Type:</label>
        <input
          type="checkbox"
          id="typeList"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="checkbox"
          id="location"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.location}
        />
      </div>
      <div>
        <label htmlFor="website">Website:</label>
        <input
          type="text"
          id="website"
          placeholder="Edit website link"
          onChange={handleChange}
          value={opportunityData.website}
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
          onChange={handleChange}
          value={opportunityData.description}
        />
      </div>
      <div>
        <label for="apply_by_date">Apply by Date:</label>
        <input
          type="date"
          id="apply_by_date"
          name="apply_by_date"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={opportunityData.apply_by_date}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  )
}

export default EditOpportunityForm
