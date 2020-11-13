import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

function EditOpportunityForm() {
  //variables
  const [opportunityData, setopportunityData] = useState({
    id: "",
    title: "",
    description: "",
    date_created: "",
    start_date: "",
    apply_by_date: "",
    image: "",
    link: "",
    eligibility: "",
    owner: "",
    typeList: [],
    location: [],
    level: [],
    audience: [],
    organisation: "",
    // is_open: true,
  })

  const { id } = useParams()

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
          type: opportunityData.type,
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
    <form>
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
          placeholder="Opportunity Title"
          onChange={handleChange}
          value={opportunityData.title}
        />
      </div>
      <div>
        <label for="start_date">Start Date:</label>
        <input
          type="date"
          id="start"
          name="start-date"
          value="2020-01-01"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={opportunityData.start_date}
        />
      </div>
      <div>
        <label htmlFor="is_open">
          Audience: Women, Indigenous, With a Disability, Mature, Financial Aid
        </label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="is_open">Level: Beginner, Intermediate, Advanced</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="is_open">
          Type:Free, Discount, Scholarship, Internship
        </label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="is_open">Location: Perth, Regional, Online</label>
        <input
          type="checkbox"
          id="is_open"
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
          placeholder="Enter website link"
          onChange={handleChange}
          value={opportunityData.website}
        />
      </div>
      <div>
        <label htmlFor="eligibility">Eligibility:</label>
        <input
          type="text"
          id="eligibility"
          placeholder="Eligibility requirements"
          onChange={handleChange}
          value={opportunityData.eligibility}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
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
          value="2020-01-01"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={opportunityData.apply_by_date}
        />
      </div>
      <div>
        <label htmlFor="is_open">Project Open:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  )
}

export default EditOpportunityForm
