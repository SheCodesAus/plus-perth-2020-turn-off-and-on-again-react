import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

function EditOpportunityForm() {
  //variables
  const [opportunityData, setopportunityData] = useState({
    "title": "Test",
    "description": "Learn the fundamentals of coding while creating a web page with this easy to follow, step by step online course. This course will help you understand the introductory concepts of web development and give some insight into work involved in creating a website.\r\n\r\nYou will work on building your basic page at the end of the course.\r\n\r\nThe videos are short, explaining one concept at a time, making it easy to follow along.\r\n\r\nSo jump right in and get started!",
    "date_created": "2020-11-04T07:44:53Z",
    "start_date": "2020-11-04T07:45:53Z",
    "apply_by_date": "2021-06-30T00:00:00Z",
    "link": "https://learn.codemasterinstitute.com/course/coding-101-website-development/",
    "eligibility": "none",
    "owner": "CodemasterInstitute",
    "typeList": [
        "free"
    ],
    "location": [
        "online"
    ],
    "level": [
        "beginner"
    ],
    "audience": [
        "financial-aid"
    ],
    "organisation": "Codemaster Institute"
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
    let form_data = new FormData();
    form_data.append('image', opportunityData.image);
    form_data.append('title', opportunityData.title);
    form_data.append('description', opportunityData.description);
    form_data.append('date_created', opportunityData.date_created);
    form_data.append('start_date', opportunityData.start_date);
    form_data.append('apply_by_date', opportunityData.apply_by_date);
    form_data.append('link', opportunityData.link);
    form_data.append('eligibility', opportunityData.eligibility);
    form_data.append('owner', opportunityData.owner);
    form_data.append('typeList', opportunityData.typeList);
    form_data.append('location', opportunityData.location);
    form_data.append('level', opportunityData.level);
    form_data.append('audience', opportunityData.audience);
    form_data.append('organisation', opportunityData.organisation);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}listing/${id}/`,
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
    <form>
      <div>
        <label htmlFor="image">Upload your image:</label>
        <img src={opportunityData.image} alt={`${opportunityData.title}`} />
        <input
          type="file"
          id="image"
          placeholder="Image"
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
          onChange={handleChange}
          value={opportunityData.title}
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
        <label htmlFor="apply_by_date">Apply by Date:</label>
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
